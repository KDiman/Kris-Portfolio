import { useSearchParams } from "react-router-dom";
import Modal from "../components/Modal";

const Itempage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const { id, Image, Name, Brand, Category, Description, Size, Price } = item;
  const Image = searchParams.get("Image");
  const Name = searchParams.get("Name");
  const Brand = searchParams.get("Brand");
  const Category = searchParams.get("Category");
  const Description = searchParams.get("Description");
  const Size = searchParams.get("Size");
  const Price = searchParams.get("Price");

  return (
    <div className="itemDetailsContainer">
      <img src={Image}></img>
      <h2>{Name}</h2>
      <p>{Description}</p>
      <p>{Size}</p>
      <span>₱{Price}</span>
    </div>
  );
};

export default Itempage;
