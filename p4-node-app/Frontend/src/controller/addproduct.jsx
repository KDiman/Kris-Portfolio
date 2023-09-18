import { useState } from "react";
import ProductForm from "../view/productform";
const Addproduct = () => {
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        const savedProduct = await response.json();
        console.log("Product saved:", savedProduct);

        
        setProduct({
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
        }
      } else {
        console.error("Error creating product:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="addProductsForm">
      <h1>{product.Name}</h1>
      <h2>Add a Product</h2>
      <ProductForm product={product} handleChange={handleChange} />
      <div>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Addproduct;
