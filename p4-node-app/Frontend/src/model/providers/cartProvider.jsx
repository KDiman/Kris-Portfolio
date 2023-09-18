import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
    const existingItem = state.find(
      (item) => item.Name === action.payload.Name
    );

    if (existingItem) {
      if (existingItem.quantity < existingItem.Stock) {
        
        return state.map((item) =>
          item.Name === action.payload.Name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        
        return state;
      }
    } else {
      return [...state, { ...action.payload, quantity: 1 }];
    }
    case "REMOVE_ITEM":
      return state.filter((item) => item.Name !== action.payload.Name);
    case "UPDATE_QUANTITY":
      const updatedState = state.map((item) =>
        item.Name === action.payload.Name
          ? { ...item, quantity: item.quantity + action.payload.quantityChange }
          : item
      );
      return updatedState.filter((item) => item.quantity > 0);
    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      dispatch({ type: "SET_CART", payload: JSON.parse(storedCart) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };
  const contextValue = { cart, dispatch ,clearCart};

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
