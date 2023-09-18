import React, { useEffect, useState } from "react";
import handleOrderStatusChange from "./updateOrderStatus";
import Modal from "../components/Modal";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedTab, setSelectedTab] = useState("New");
  const [noOrdersFound, setNoOrdersFound] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/orders/${selectedTab}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        return response.json();
      })
      .then((data) => {
        if (data.length === 0) {
          setNoOrdersFound(true);
        } else {
          setNoOrdersFound(false);
          setOrders(data);
        }
      })
      .catch((error) => {
        setError(error);
        setNoOrdersFound(true);
      });
  }, [selectedTab]);

  const tabs = ["New", "Shipped", "Completed", "Refunded", "Cancelled"];

  const openModalForOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setComment(value);
  };

  const handleSubmit = () => {
    handleOrderStatusChange(
      selectedOrder._id,
      selectedOrder.OrderStatus,
      selectedTab,
      orders,
      setOrders,
      comment
    );

    setShowModal(false);
  };

  return (
    <div className="my-orders-container">
      <div className="order-tabs">
        {tabs.map((tab) => (
          <h3
            key={tab}
            className={`order-tab ${selectedTab === tab ? "active" : ""}`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </h3>
        ))}
      </div>
      <h2 className="my-orders-title">{selectedTab} Orders</h2>
      {noOrdersFound ? (
        <p>No orders found</p>
      ) : (
        <ul className="my-orders-list">
          {orders.map((order) => (
            <li
              key={order._id}
              className="my-order-item"
              data-status={order.OrderStatus}
            >
              <div>
                <ul>
                  {order.OrderedItems.map((item) => (
                    <li key={item._id} className="myOrderedItems">
                      <img
                        src={item.Image}
                        className="orderedImg"
                        alt={item.Name}
                      />
                      {item.Name} - Quantity: {item.quantity}
                    </li>
                  ))}
                </ul>
                <div className="my-customer-info">
                  <strong>Customer Name:</strong> {order.CustomerName}
                  <strong>Contact:</strong> {order.Contact}
                  <strong>Address:</strong> {order.Address}
                  <strong>Total Amount:</strong> {order.TotalAmount}
                  <strong>Date:</strong> {order.Date}
                  <strong>Time:</strong> {order.Time}
                  <strong>Order Status:</strong>
                  <select
                    value={order.OrderStatus}
                    onChange={(e) =>
                      handleOrderStatusChange(
                        order._id,
                        e.target.value,
                        selectedTab
                      )
                    }
                  >
                    {tabs.map((tab) => (
                      <option key={tab} value={tab}>
                        {tab}
                      </option>
                    ))}
                  </select>
                  {selectedTab === "Refunded" || selectedTab === "Cancelled" ? (
                    <div>
                    <strong>Comments:{order.Comments}</strong> 
                  
                    <button onClick={() => openModalForOrder(order)}>
                      Input Reason
                    </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedOrder(null);
        }}
      >
        <form onSubmit={handleSubmit}>
          <label>Reason:</label>
          <input
            type="text"
            name="Reason"
            value={comment}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </div>
  );
};

export default MyOrders;
