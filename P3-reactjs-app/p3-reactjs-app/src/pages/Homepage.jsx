import React, { useContext, useState, useReducer, useEffect } from "react";
import { ItemsContext } from "../components/itemProvider.jsx";
import { BiSolidShoppingBag } from "react-icons/bi";
import Cart from "../components/cart.jsx";
import Items from "../components/items.jsx";
import Navbar from "../components/navbar.jsx";
import SortItems from "../components/sortItems.jsx";
import Footer from "../components/footer.jsx";

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.find(
        (item) => item.Name === action.payload.Name
      );
      if (existingItem) {
        return state.map((item) =>
          item.Name === action.payload.Name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    case "REMOVE_ITEM":
      return state.filter((item) => item.Name !== action.payload.Name);
    case "UPDATE_QUANTITY":
      const updatedState = state.map((item) =>
        item.Name === action.payload.Name
          ? { ...item, quantity: item.quantity + action.payload.quantityChange }
          : item
      );
      return updatedState.filter((item) => item.quantity > 0);
    default:
      return state;
  }
};

const HomePage = () => {
  const [originalItems, setOriginalItems] = useState([]);
  const [items, setItems] = useContext(ItemsContext);
  const [cartBar, setCartBar] = useState(false);
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const products = (filteredItems.length > 0
    ? filteredItems
    : items
  ).map((product, index) => (
    <Items item={product} key={index} addToCart={addToCart} />
  ));

  useEffect(() => {
    setOriginalItems(items);
    setFilteredItems(items);
  }, [items]);

  return (
    <div>
      <div className="header">
        <Navbar
          items={items}
          originalItems={originalItems}
          setItems={setFilteredItems}
          setFilteredItems={setFilteredItems}
        />
        <div className="cartIconDiv" onClick={() => setCartBar(!cartBar)}>
          <BiSolidShoppingBag className="cartIcon" />
          {totalCartItems > 0 && (
            <span className="cartBadge">{totalCartItems}</span>
          )}
        </div>
        <div className="homePageBanner"></div>
      </div>
      <div>
        <SortItems
          items={items}
          setItems={setFilteredItems}
          originalItems={originalItems}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
      <div className="container">{products}</div>

      {cartBar && (
        <div onClick={() => setCartBar(false)} className="cart-overlay"></div>
      )}
      <div className={cartBar ? "cart-menu active" : "cart-menu"}>
        <div>
          <Cart cart={cart} dispatch={dispatch} />
        </div>
        <button className="checkOutBtn">Check Out</button>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
