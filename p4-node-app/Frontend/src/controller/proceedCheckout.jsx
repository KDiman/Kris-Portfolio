import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../model/providers/cartProvider";

const Checkout = ({ orders, setOrders }) => {
  const navigate = useNavigate();

  const { clearCart } = useCart();

  useEffect(() => {
    if (orders.checkoutComplete) {
      toast.success("Thank you for your order");
      navigate("/");
      window.location.reload();
    }
  }, [orders.checkoutComplete]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const getCurrentDateAndTime = () => {
      const currentDate = new Date();
      const date = currentDate.toLocaleDateString();
      const time = currentDate.toLocaleTimeString();
      return { date, time };
    };

    const { date, time } = getCurrentDateAndTime();
    console.log(orders);

    try {
      const response = await fetch("http://localhost:8080/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...orders,
          Date: date,
          Time: time,
          ModeofPayment: orders.PaymentMethod,
          OrderStatus: "New",
          Comments: "",
        }),
      });

      if (response.ok) {
        const savedOrder = await response.json();
        console.log("Order saved:", savedOrder);
        navigate("/");

        clearCart();
        setOrders({
          CustomerName: "",
          Contact: "",
          Address: "",
          TotalAmount: 0,
          Date: date,
          Time: time,
          ModeofPayment: "",
          OrderedItems: [],
          checkoutComplete: true,
        });

        for (const orderedItem of orders.OrderedItems) {
          const productIdToUpdate = orderedItem._id;
          const quantityToDeduct = orderedItem.quantity;

          const productResponse = await fetch(
            `http://localhost:8080/products/id/${productIdToUpdate}`
          );

          if (productResponse.ok) {
            const productData = await productResponse.json();
            const currentStock = productData.Stock;
            console.log("productData", productData);
            if (currentStock >= quantityToDeduct) {
              const newStock =
                parseInt(currentStock) - parseInt(quantityToDeduct);

              console.log("currentStock", currentStock);
              console.log("newStock", newStock);
              const updateResponse = await fetch(
                `http://localhost:8080/products/update/id/${productIdToUpdate}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ Stock: newStock }),
                }
              );
              if (newStock === 0) {
                const outOfStock = await fetch(
                  `http://localhost:8080/products/outofstock/true/${productIdToUpdate}`,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ OutOfStock: true }),
                  }
                );
                if (outOfStock.ok) {
                  console.log(
                    `Product ${productIdToUpdate} quantity out of stock status updated successfully`
                  );
                } else {
                  console.error(
                    `Error updating product out of stock status  ${productIdToUpdate}:`,
                    updateResponse.statusText
                  );
                }
              }

              if (updateResponse.ok) {
                console.log(
                  `Product ${productIdToUpdate} quantity updated successfully`
                );
              } else {
                console.error(
                  `Error updating product ${productIdToUpdate}:`,
                  updateResponse.statusText
                );
              }
            } else {
              console.error(
                `Insufficient stock for product ${productIdToUpdate}`
              );
            }
          } else {
            console.error(
              `Error fetching product ${productIdToUpdate}:`,
              productResponse.statusText
            );
          }
        }
      } else {
        console.error("Error creating order:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button type="submit" onClick={handleSubmit}>
        Proceed Checkout
      </button>
    </div>
  );
};

export default Checkout;
