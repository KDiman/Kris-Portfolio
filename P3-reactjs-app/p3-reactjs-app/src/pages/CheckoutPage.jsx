import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useState } from "react";

const paymentOptions = [
  { id: "creditCard", label: "Credit Card" },
  { id: "paypal", label: "PayPal" },
  { id: "cashOnDelivery", label: "Cash on Delivery" },
];

const calculateTotal = (items) => {
  let total = 0;
  for (const item of items) {
    total += item.Price * item.quantity;
  }
  return total;
};

const CheckoutPage = () => {
  const [selectedPayment, setSelectedPayment] = useState(paymentOptions[0].id);
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const cartJson = queryParams.cart;
  try {
    const cartData = JSON.parse(cartJson);
    console.log(cartData);
    return (
      <div>
        <div className="checkout-container">
          <h2 className="checkout-header">Checkout</h2>
          {cartData.map((item) => (
            <div className="checkout-item " key={item.id}>
              <img src={item.Image} />
              <p>{item.Name}</p>
              <p>Price: ${item.Price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
          <div className="total">
            <strong>Total Amount:</strong> ₱{calculateTotal(cartData)}
          </div>{" "}
        </div>

        <div className="checkout-details">
          <form>
            <input type="text" placeholder="Name" required />
            <input type="number" placeholder="Contact Number" required />
            <input type="text" placeholder="Address" required />
          </form>
          <div className="payment-options">
            <h3>Select Payment Method:</h3>
            {paymentOptions.map((option) => (
              <div className="payment-type" key={option.id}>
                <input
                  type="radio"
                  id={option.id}
                  name="paymentMethod"
                  value={option.id}
                  checked={selectedPayment === option.id}
                  onChange={() => setSelectedPayment(option.id)}
                />
                <label htmlFor={option.id}>{option.label}</label>
              </div>
            ))}
          </div>
          <button>Proceed Checkout</button>
        </div>
        <Link className="back-home" to="/">
          Go back to Home
        </Link>
      </div>
    );
  } catch (error) {
    return <div></div>;
  }
};

export default CheckoutPage;
