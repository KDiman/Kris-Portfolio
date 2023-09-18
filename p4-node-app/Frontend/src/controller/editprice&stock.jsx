import React, { useState, useEffect } from "react";

const EditPriceandStock = ({ productId, closeModal }) => {
  const [product, setProduct] = useState({
    Image: "",
    Name: "",
    Brand: "",
    Type: "",
    Category: "",
    Description: "",
    Size: "",
    Price: 0,
    Stock: 0,
  });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/products/id/${productId}`
        );

        if (response.ok) {
          const productData = await response.json();
          setProduct(productData);
        } else {
          console.error("Error fetching product data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [productId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
     
      const response = await fetch(
        `http://localhost:8080/products/update/id/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );

      if (!response.ok) {
        console.error("Error updating product:", response.statusText);
        return;
      }

     
      const outOfStockResponse = await fetch(
        `http://localhost:8080/products/outofstock/${product.Stock === 0}/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ OutOfStock: product.Stock === 0 }),
        }
      );

      if (outOfStockResponse.ok) {
        console.log(
          `Product ${productId} out-of-stock status updated successfully`
        );
      } else {
        console.error(
          `Error updating product out-of-stock status ${productId}:`,
          outOfStockResponse.statusText
        );
      }

      closeModal();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="addProductsForm">
      <h1>{product.Name}</h1>
      <h3>Edit Price & Stock</h3>

      <form>
        <div>
          <label>Price:</label>
          <input
            type="text"
            name="Price"
            value={product.Price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Stock:</label>
          <input
            type="text"
            name="Stock"
            value={product.Stock}
            onChange={handleChange}
          />
        </div>
      </form>
      <div>
        <button type="button" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
};

export default EditPriceandStock;
