import React, { useContext, useState, useEffect } from "react";
import { ItemsContext } from "../model/providers/itemprovider";
import { BiSolidShoppingBag } from "react-icons/bi";
import Cart from "../view/cart";
import Items from "../components/items.jsx";
import Navbar from "../view/navbar.jsx";
import SortItems from "../controller/sortItems.jsx";
import Footer from "../view/footer";
import { Link } from "react-router-dom";
import queryString from "query-string";
import Sadiebanner from "../assets/Sadiebanner.png";
import { useCart } from "../model/providers/cartProvider";

const HomePage = () => {
  const localStorageKey = "cartItems";
  const loadCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem(localStorageKey);
    return storedCart ? JSON.parse(storedCart) : [];
  };
  const saveCartToLocalStorage = (cartItems) => {
    localStorage.setItem(localStorageKey, JSON.stringify(cartItems));
  };
  const [originalItems, setOriginalItems] = useState([]);
  const [items, setItems] = useContext(ItemsContext);
  const [cartBar, setCartBar] = useState(false);

  const { cart, dispatch } = useCart();

  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  const startCheckout = () => {
    const cartItemsString = queryString.stringify({
      cart: JSON.stringify(cart),
    });
    const checkoutUrl = `/checkout?${cartItemsString}`;
    window.location.href = checkoutUrl;
  };

  const addToCart = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };
  const cartJson = JSON.stringify(cart);

  const products = (filteredItems.length > 0
    ? filteredItems
    : items
  ).map((product, index) => (
    <Items item={product} key={index} addToCart={addToCart} />
  ));

  useEffect(() => {
    setOriginalItems(items);
    setFilteredItems(items);
  }, [items]);

  useEffect(() => {
    saveCartToLocalStorage(cart);
  }, [cart]);

  const checkout = () => {
    const cartItemsString = queryString.stringify({
      cart: JSON.stringify(cart),
    });
    const checkoutUrl = `/checkout?${cartItemsString}`;
    window.location.href = checkoutUrl;
  };

  return (
    <div>
      <div className="header">
        <Navbar
          items={items}
          originalItems={originalItems}
          setItems={setFilteredItems}
          setFilteredItems={setFilteredItems}
        />
        <div className="cartIconDiv" onClick={() => setCartBar(!cartBar)}>
          <BiSolidShoppingBag className="cartIcon" />
          {totalCartItems > 0 && (
            <span className="cartBadge">{totalCartItems}</span>
          )}
        </div>
        <div>
          <img className="homePageBanner" src={Sadiebanner} />
        </div>
      </div>
      <div>
        <SortItems
          items={items}
          setItems={setFilteredItems}
          originalItems={originalItems}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
      <div className="container">{products}</div>

      {cartBar && (
        <div onClick={() => setCartBar(false)} className="cart-overlay"></div>
      )}
      <div className={cartBar ? "cart-menu active" : "cart-menu"}>
        <div>
          <Cart cart={cart} dispatch={dispatch} />
        </div>
        <Link
          className="checkoutBtn"
          to={`/checkout?cart=${encodeURIComponent(cartJson)}`}
        >
          Checkout
        </Link>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
