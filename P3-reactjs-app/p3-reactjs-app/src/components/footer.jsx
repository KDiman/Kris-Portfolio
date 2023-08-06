import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { TfiInstagram, TfiFacebook } from "react-icons/tfi";
import { FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h2>Sadie Online Shop</h2>
        </div>
        <div className="footer-links">
          <div>
            <h2>About Us</h2>
            <p>
              Welcome to Sadie Online Shoppe💖 ✨<br />
              <br />
              We sell AUTHENTIC products from US. We guarantee that all items
              are purchased directly from official brand sites and authorized
              distributors only. ✨ <br />
              <br />
              To show our gratitude to our clients, each order checkout will get
              a freebie! ✨<br />
              <br />
              For any doubts you may send us a message and we can provide proof
              of authenticity for our listings ‼️All brands and product names
              are trademarks of their respective owners.
            </p>
          </div>
          <div>
            <h2>Contact</h2>
            <AiOutlineMail />
            <span>sadieonlineshoppe@gmail.com</span>
          </div>
        </div>
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com/SadieOnlineShoppe/">
              <i className="facebook">
                <TfiFacebook className="socialIcons" />
              </i>
            </a>
            <a href="https://www.tiktok.com/@SadieOnlineShoppe?fbclid=IwAR3gadYaV-tAr-OORcmaR17d06j4fxhJLmZMluAtkCbKBmjVlDHGEnUB8jA">
              <i className="tiktok">
                <FaTiktok className="socialIcons" />
              </i>
            </a>
            <a href="https://www.instagram.com/sadieonlineshoppe/">
              <i className="instagram">
                <TfiInstagram className="socialIcons" />
              </i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 Sadie Online Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
