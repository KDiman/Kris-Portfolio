import React from "react";

const CheckoutForm = ({ handleChange, selectedPayment, handlePaymentChange, paymentOptions }) => {
  return (
    <div>
      <form onChange={handleChange}>
        <input type="text" name="CustomerName" placeholder="Name" required />
        <input type="number" name="Contact" placeholder="Contact Number" required />
        <input type="text" name="Address" placeholder="Address" required />
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
              onChange={handlePaymentChange}
            />
            <label htmlFor={option.id}>{option.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutForm;
