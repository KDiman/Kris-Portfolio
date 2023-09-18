import React, { useState, useContext } from "react";
import { InActiveItemsContext } from "../model/providers/inactiveitemsprovider";
import { Link } from "react-router-dom"

function RecycleBinPage() {
  const [items, setItems] = useContext(InActiveItemsContext);
  const [isRestoring, setIsRestoring] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false)

  const handleRestore = async (productId) => {
    try {
      setIsRestoring(true); 
  
      const updatedData = {
        isActive: false,
      };
  
      const response = await fetch(
        `http://localhost:8080/products/isActive/true/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

  
      if (response.ok) {
        console.log("Item is restored");
        window.location.reload()
      } else {
        console.error("Error restoring product:", response.statusText);
      }
    } catch (error) {
      console.error("Error restoring product:", error);
    } finally {
      setIsRestoring(false); 
    };
  };
  const handleDelete = async (productId) => {
    try {
      setIsRestoring(true);

      const updatedData = {
        isActive: false,
      };

      const response = await fetch(
        `http://localhost:8080/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        console.log("Item is Deleted");
      } else {
        console.error("Error deleting product:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <div className="sellerNavContainer">
        <div className="sellerNav">
          <div className="hubMyProducts">
            <h3>My Products</h3>
          </div>
        </div>
        <div>
          {items.map((product, index) => (
            <div key={index}>
              <img
                className="hub-image"
                src={product.Image}
                alt={product.Name}
              />
              <p>Name: {product.Name}</p>
              <p>Price: ${product.Price}</p>
              <p>Stock: {product.Stock}</p>

              <div>
                <button onClick={() => handleDelete(product._id)}>
                  Delete
                </button>
                <button onClick={() => handleRestore(product._id)}>
                  Restore
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Link className="back-home" to="/sellerhub">
          Go back to Seller Hub
        </Link>
    </div>
  );
}

export default RecycleBinPage;
