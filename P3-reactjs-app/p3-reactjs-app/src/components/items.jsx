import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useOpenDiv } from "./opendivcontext";

const Items = ({ item, addToCart, noItems }) => {
  const { id, Image, Name, Brand, Category, Description, Size, Price } = item;
  const [popupcontent, setPopUpContent] = useState([]);

  const [toggle, setToggle] = useState(false);
  const { isOpen, setIsOpen } = useOpenDiv();
  const changeContent = (item) => {
    setPopUpContent([item]);
    setToggle(!toggle);
  };
  console.log(isOpen);
  return (
    <div className="productContainer">
      <div className="item-container">
        <div onClick={() => changeContent(item)}>
          <img className="itemImage" src={Image} />
          <div className="itemName">{Name}</div>
          {!isOpen && (
            <div>
              <span className="price">₱{Price}</span>
            </div>
          )}
        </div>
        {!isOpen && (
          <button className="addToCartBtn" onClick={() => addToCart(item)}>
            Add to Cart
          </button>
        )}
      </div>

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
      {isOpen && (
        <div>
          <h1 className="noItemsMessage">
            Sorry, we do not have an item matching your criteria
          </h1>
        </div>
      )}
    </div>
  );
};
export default Items;
