import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { TfiInstagram, TfiFacebook } from "react-icons/tfi";
import { FaTiktok } from "react-icons/fa";
import Modal from "../components/Modal";

const Navbar = ({ items, setItems, originalItems }) => {
  const [navBar, setNavBar] = useState(false);

  const [searchBar, setSearchBar] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openAnnouncementModal, setOpenAnnouncementModal] = useState(false);
  const [selectedtype, setSelectedType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleAnnouncementModal = () => {
    setOpenAnnouncementModal(!openAnnouncementModal);
  };

  const applySearchFilter = (query) => {
    const filteredItems = originalItems.filter((item) => {
      const lowerCaseQuery = query.toLowerCase();
      return item.Name.toLowerCase().includes(lowerCaseQuery);
    });
    setItems(filteredItems);
  };

  const resetSorting = () => {
    setSelectedType("");
    setItems(originalItems);
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    applySearchFilter(query);
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
        <h3 className="navbarList" onClick={resetSorting}>
          All Products
        </h3>
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
        <h3 className="navbarList" onClick={handleAnnouncementModal}>
          Mini's
        </h3>
        <h3 className="navbarList" onClick={() => setOpenModal(true)}>
          Track Order
        </h3>
      </div>
      <div className="topRight">
        <div className="searchBar">
          <input
            className={searchBar ? "inputSearch active" : "inputSearch"}
            type="text"
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
            <li className="burgerList" onClick={resetSorting}>
              All Products
            </li>
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
            <li className="burgerList" onClick={handleAnnouncementModal}>
              Mini's
            </li>
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
              <i className="facebook">
                <TfiFacebook className="socialIconsBurger" />
              </i>
            </a>
            <a href="https://www.tiktok.com/@SadieOnlineShoppe?fbclid=IwAR3gadYaV-tAr-OORcmaR17d06j4fxhJLmZMluAtkCbKBmjVlDHGEnUB8jA">
              <i className="tiktok">
                <FaTiktok className="socialIconsBurger" />
              </i>
            </a>
            <a href="https://www.instagram.com/sadieonlineshoppe/">
              <i className="instagram">
                <TfiInstagram className="socialIconsBurger" />
              </i>
            </a>
          </div>
        </div>
      </div>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <iframe
          className="frame"
          src="https://www.jtexpress.ph/index/query/gzquery.html"
        ></iframe>
      </Modal>

      <Modal
        className="annoucement"
        open={openAnnouncementModal}
        onClose={handleAnnouncementModal}
      >
        <h2>Announcement</h2>
        <p>
          Please Follow us on our Instagram for more details on the release of
          the next batch of Mini's
        </p>
        <a href="https://www.instagram.com/sadieonlineshoppe/">
          <i className="instagram">
            <TfiInstagram className="socialIconsBurger" />
          </i>
        </a>
      </Modal>
    </div>
  );
};

export default Navbar;
