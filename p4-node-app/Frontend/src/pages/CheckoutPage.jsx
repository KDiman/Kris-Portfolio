import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useState } from "react";
import Checkout from "../controller/proceedCheckout";
import CheckoutForm from "../view/checkoutdetailsform";

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

    // console.log("cartData:", cartData);

    const [orders, setOrders] = useState({
      CustomerName: "",
      Contact: "",
      Address: "",
      TotalAmount: calculateTotal(cartData),
      Date: "",
      Time: "",
      ModeofPayment: "",
      OrderedItems: cartData,
      OrderStatus:"",
      Comments:"",
    });
    const handleChange = (event) => {
      const { name, value } = event.target;
      setOrders({
        ...orders,
        [name]: value,
      });
    };

    const handlePaymentChange = (event) => {
      setSelectedPayment(event.target.value);

      setOrders({
        ...orders,
        ModeofPayment: event.target.value,
      });
    };

    return (
      <div>
        <div className="checkout-container">
          <h2 className="checkout-header">Checkout</h2>
          {cartData.map((item) => (
            <div className="checkout-item " key={item._id}>
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
        <CheckoutForm
          handleChange={handleChange}
          selectedPayment={selectedPayment}
          handlePaymentChange={handlePaymentChange}
          paymentOptions={paymentOptions}
        />
        <div className="checkout-details">
          <Checkout orders={orders} setOrders={setOrders}  />
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
