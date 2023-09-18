import { React, useContext, useState, useEffect } from "react";
import { ItemsContext } from "../model/providers/itemprovider";
import Modal from "../components/Modal";
import Editproduct from "./editproduct";
import EditPriceandStock from "./editprice&stock";
import Addproduct from "../controller/addproduct";
import searchActiveProduct from "./activeproductsearch";

const SellerHubNav = () => {
  const [items, setItems] = useContext(ItemsContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [isDelisting, setIsDelisting] = useState(false);

  const [searchResults, setSearchResults] = useState(null);
  const [productName, setProductName] = useState("");

  const openModal = (productId) => {
    setEditProductId(productId);
    setIsModalOpen(true);
  };
  const openSecondModal = (productId) => {
    setEditProductId(productId);
    setIsSecondModalOpen(true);
  };
  const openAddProductModal = (productId) => {
    setEditProductId(productId);
    setIsAddProductOpen(true);
  };

  const closeModal = () => {
    setEditProductId(null);
    setIsModalOpen(false);
  };
  const closeSecondModal = () => {
    setEditProductId(null);
    setIsSecondModalOpen(false);
  };
  const closeAddProductModal = () => {
    setEditProductId(null);
    setIsAddProductOpen(false);
  };

  const handleEdit = (productId) => {
    openSecondModal(productId);
  };

  const handleEditPrice = (productId) => {
    openModal(productId);
  };

  const handleDelist = async (productId) => {
    try {
      setIsDelisting(true);

      const updatedData = {
        isActive: false,
      };

      const response = await fetch(
        `http://localhost:8080/products/isActive/false/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        console.log("Item is delisted");
        window.location.reload();
      } else {
        console.error("Error delisting product:", response.statusText);
      }
    } catch (error) {
      console.error("Error delisting product:", error);
    } finally {
      setIsDelisting(false);
    }
  };
 
  const handleSearch = async () => {
    try {
      const productName = document.getElementById("productNameInput").value;
      const searchResults = await searchActiveProduct(productName);
      console.log(searchResults); // Updated variable name here
      setSearchResults(searchResults);
    } catch (error) {
      console.error("Error searching for products:", error);
    }
  };
  
  
  return (
    <div>
      <form>
        <input
          type="text"
          id="productNameInput"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            const productName = document.getElementById("productNameInput")
              .value;
            handleSearch(productName);
          }}
        >
          Search
        </button>
      </form>

      <div className="sellerNavContainer">
        <div className="myProductsContainer">
          {searchResults
            ? searchResults.map((product, index) => (
                <div key={index} className="myProducts">
                  <img
                    className="hub-image"
                    src={product.Image}
                    alt={product.Name}
                  />
                  <p>Name: {product.Name}</p>
                  <p>Price: ${product.Price}</p>
                  <p>Stock: {product.Stock}</p>

                  <div>
                    <button onClick={() => handleEdit(product._id)}>
                      Edit
                    </button>
                    <button onClick={() => handleEditPrice(product._id)}>
                      Price & Stock
                    </button>
                    <button onClick={() => handleDelist(product._id)}>
                      Delist
                    </button>
                  </div>
                </div>
              ))
            : items.map((product, index) => (
                <div key={index} className="myProducts">
                  <img
                    className="hub-image"
                    src={product.Image}
                    alt={product.Name}
                  />
                  <p>Name: {product.Name}</p>
                  <p>Price: ${product.Price}</p>
                  <p>Stock: {product.Stock}</p>

                  <div>
                    <button onClick={() => handleEdit(product._id)}>
                      Edit
                    </button>
                    <button onClick={() => handleEditPrice(product._id)}>
                      Price & Stock
                    </button>
                    <button onClick={() => handleDelist(product._id)}>
                      Delist
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
      <Modal open={isSecondModalOpen} onClose={closeSecondModal}>
        <Editproduct
          productId={editProductId}
          closeSecondModal={closeSecondModal}
        />
      </Modal>
      <Modal open={isModalOpen} onClose={closeModal}>
        <EditPriceandStock productId={editProductId} closeModal={closeModal} />
      </Modal>
      <button className="addProductBtn" onClick={openAddProductModal}>
        Add New Product
      </button>
      <Modal open={isAddProductOpen} onClose={closeAddProductModal}>
        <Addproduct />
      </Modal>
    </div>
  );
};

export default SellerHubNav;
