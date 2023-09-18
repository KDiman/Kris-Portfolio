const handleOrderStatusChange = async (orderId, newStatus, selectedTab, orders, setOrders, comment) => {
    try {
      const response = await fetch(`http://localhost:8080/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          OrderStatus: newStatus,
          Comments: comment,
        }),
      });
  
      if (!response.ok) {
        window.location.reload();
        throw new Error("Failed to update order status");
      }
  
      
      const updatedOrders = orders.map((order) =>
        order._id === orderId ? { ...order, Comments: comment } : order
      );
      setOrders(updatedOrders);
  
      console.log("Order status changed successfully:", newStatus);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  
  export default handleOrderStatusChange;
  