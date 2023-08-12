import React, { useState } from "react";
import CheckoutPage from "../pages/CheckoutPage";
const Cart = ({ cart, dispatch }) => {
  const [cartItems, setCartItems] = useState([...cart]);

  const calculateTotal = () => {
    let total = 0;
    for (const item of cart) {
      total += item.Price * item.quantity;
    }
    return total;
  };

  return (
    <div>
      <h2>Cart</h2>
      <div>
        {cart.map((item, index) => (
          <div className="cartItem-container" key={index}>
            <span className="cart-name">{item.Name}</span>
            <img className="cart-image" src={item.Image} alt={item.Name} />
            <span className="cart-price">₱{item.Price}</span>
            <div className="qauntityContainer">
              <span>Qauntity:</span>
              <button
                onClick={() =>
                  dispatch({
                    type: "UPDATE_QUANTITY",
                    payload: { Name: item.Name, quantityChange: -1 },
                  })
                }
                className="quantityBtn"
              >
                -
              </button>
              <span className="quantity">{item.quantity}</span>
              <button
                onClick={() =>
                  dispatch({
                    type: "UPDATE_QUANTITY",
                    payload: { Name: item.Name, quantityChange: 1 },
                  })
                }
                className="quantityBtn"
              >
                +
              </button>
            </div>

            <button
              onClick={() =>
                dispatch({ type: "REMOVE_ITEM", payload: { Name: item.Name } })
              }
              className="removeBtn"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="total">
        <strong>Total Amount:</strong> ₱{calculateTotal()}
      </div>
      <CheckoutPage cartItems={cartItems} />
    </div>
  );
};

export default Cart;
