import React, { useState, useEffect } from "react";
import ProductForm from "../view/productform";

const Editproduct = ({ productId, closeSecondModal }) => {
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

      if (response.ok) {
        closeSecondModal();
      }
      const outOfStockResponse = await fetch(
        `http://localhost:8080/products/outofstock/${
          product.Stock === 0
        }/${productId}`,
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
        console.error("Error updating product:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <h1>{product.Name}</h1>
      <h3>Edit Product</h3>
      <ProductForm product={product} handleChange={handleChange} />
      <button type="button" onClick={handleUpdate}>
        Update
      </button>
    </div>
  );
};

export default Editproduct;
