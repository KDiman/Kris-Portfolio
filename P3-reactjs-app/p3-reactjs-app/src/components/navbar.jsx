import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { TfiInstagram, TfiFacebook } from "react-icons/tfi";
import { FaTiktok } from "react-icons/fa";

import Modal from "./Modal";

const Navbar = ({ items, setItems, originalItems }) => {
  const [navBar, setNavBar] = useState(false);

  const [searchBar, setSearchBar] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [selectedtype, setSelectedType] = useState("");

  const skincare = [...new Set(originalItems.map((item) => item.Type))];
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    applySearchFilter(event.target.value);
  };

  const applySearchFilter = (query) => {
    const filteredItems = originalItems.filter(
      (item) =>
        item.Name.toLowerCase().includes(query.toLowerCase()) ||
        item.Brand.toLowerCase().includes(query.toLowerCase())
    );
    setItems(filteredItems);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    applyTypeSorting(type);
  };

  const applyTypeSorting = (type) => {
    if (type === "All") {
      setItems(originalItems);
    } else {
      const filteredItems = originalItems.filter((item) => item.Type === type);
      setItems(filteredItems);
    }
  };

  return (
    <div>
      <div className="hidden" onClick={() => setNavBar(!navBar)}>
        <AiOutlineMenu className="burger" />
      </div>
      <div className="navBar">
        <h3
          className="navbarList"
          onClick={() => handleTypeChange("Skin Care")}
        >
          Skin Care
        </h3>
        <h3 className="navbarList" onClick={() => handleTypeChange("Make Up")}>
          Make Up
        </h3>

        <h3 className="navbarList" onClick={() => handleTypeChange("Others")}>
          Others
        </h3>
        <h3 className="navbarList">Mini's</h3>
        <h3 className="navbarList" onClick={() => setOpenModal(true)}>
          Track Order
        </h3>
      </div>
      <div className="topRight">
        <div className="searchBar">
          <input
            className={searchBar ? "inputSearch active" : "inputSearch"}
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
          />
          <AiOutlineSearch
            className="search-icon"
            onClick={() => setSearchBar(!searchBar)}
          />
        </div>
      </div>

      {navBar ? (
        <div onClick={() => setNavBar(!navBar)} className="overlay"></div>
      ) : (
        ""
      )}

      <div className={navBar ? "nav-menu active" : "nav-menu"}>
        <h2 className="burgerName">Sadie Online Shop</h2>
        <nav>
          <ul>
            <li
              className="burgerList"
              onClick={() => handleTypeChange("Skin Care")}
            >
              Skin Care
            </li>
            <li
              className="burgerList"
              onClick={() => handleTypeChange("Make Up")}
            >
              Make Up
            </li>
            <li className="burgerList">Mini's</li>
            <li
              className="burgerList"
              onClick={() => handleTypeChange("Others")}
            >
              Other's
            </li>
            <li className="burgerList" onClick={() => setOpenModal(true)}>
              Track Order
            </li>
          </ul>
        </nav>
        <div>
          <h2 className="followUs">Follow Us</h2>
          <div className="social-icons">
            <a href="https://www.facebook.com/SadieOnlineShoppe/">
              <i className="fab fa-facebook">
                <TfiFacebook className="socialIconsBurger" />
              </i>
            </a>
            <a href="#">
              <i className="fab fa-tiktok">
                <FaTiktok className="socialIconsBurger" />
              </i>
            </a>
            <a href="https://www.instagram.com/sadieonlineshoppe/">
              <i className="fab fa-instagram">
                <TfiInstagram className="socialIconsBurger" />
              </i>
            </a>
          </div>
        </div>
      </div>

      <Modal open={openModal} onClose={() => setOpenModal(!openModal)} />
    </div>
  );
};

export default Navbar;
