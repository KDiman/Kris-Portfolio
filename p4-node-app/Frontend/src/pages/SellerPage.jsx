import React, { useState } from "react";

import SellerHubNav from "../controller/sellerhubnav";

import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import MyOrders from "../controller/myorders";

function SellerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMyOrders, setShowMyOrders] = useState(true);
  const [showMyProducts, setShowMyProducts] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <div>
      <div>
        <div className="sellerNav">
          <div
            className={`hubMyOrders ${showMyOrders ? "active" : ""}`}
            onClick={() => {
              setShowMyOrders(true);
              setShowMyProducts(false);
            }}
          >
            <h3>My Orders</h3>
          </div>
          <div
            className={`hubMyProducts ${showMyProducts ? "active" : ""}`}
            onClick={() => {
              setShowMyOrders(false);
              setShowMyProducts(true);
            }}
          >
            <h3>My Products</h3>
          </div>
        </div>
        <div>
          {showMyOrders && <MyOrders />}
          {showMyProducts && (
            <SellerHubNav>
              {" "}
              <button className="addProductBtn" onClick={openModal}>
                Add New Product
              </button>
            </SellerHubNav>
          )}
        </div>
        <Link className="back-home" to="/recyclebin">
          <FaTrashAlt />
        </Link>
        <Link to="/login" onClick={handleLogout} className="back-home">
          <IoMdLogOut />
        </Link>
      </div>
    </div>
  );
}

export default SellerPage;
