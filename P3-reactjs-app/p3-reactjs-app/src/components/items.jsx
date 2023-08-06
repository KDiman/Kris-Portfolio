import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Items = ({ item, addToCart }) => {
  const { id, Image, Name, Brand, Category, Description, Size, Price } = item;
  const [popupcontent, setPopUpContent] = useState([]);

  const [toggle, setToggle] = useState(false);

  const changeContent = (item) => {
    setPopUpContent([item]);
    setToggle(!toggle);
  };

  return (
    <div className="productContainer">
      <div className="item-container">
        <div onClick={() => changeContent(item)}>
          <img className="itemImage" src={Image} />
          <div className="itemName">{Name}</div>
          <span className="price">₱{Price}</span>
        </div>
      </div>
      <button className="addToCartBtn" onClick={() => addToCart(item)}>
        Add to Cart
      </button>
      <div>
        {toggle && (
          <div className="overlay">
            <div className="popUpContent">
              <div className="popUpheader">
                <AiOutlineCloseCircle
                  size={20}
                  onClick={changeContent}
                  className="closeIcon"
                />
              </div>
              <div className="pupUpContent">
                {popupcontent.map((pop, index) => {
                  return (
                    <div className="popUpCard" key={index}>
                      <img className="popImage" src={pop.Image} />
                      <h2 className="popName">{pop.Name}</h2>
                      <p className="popDescription">{pop.Description}</p>
                      <span className="popSize">Size:{pop.Size}</span>
                      <span className="popPrice">Price:₱{pop.Price}</span>
                      <button
                        className="addToCartBtn"
                        onClick={() => addToCart(item)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Items;
