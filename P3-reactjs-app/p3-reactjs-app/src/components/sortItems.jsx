import React, { useState, useEffect } from "react";

const SortItems = ({ items, setItems, originalItems }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceSort, setPriceSort] = useState("");

  const categories = [...new Set(originalItems.map((item) => item.Category))];
  const brands = [...new Set(originalItems.map((item) => item.Brand))];

  const applySorting = () => {
    let sortedItems = [...originalItems];

    if (priceSort === "highest") {
      sortedItems.sort((a, b) => b.Price - a.Price);
    } else if (priceSort === "lowest") {
      sortedItems.sort((a, b) => a.Price - b.Price);
    }

    if (selectedCategory) {
      sortedItems = sortedItems.filter(
        (item) => item.Category === selectedCategory
      );
    }
    if (selectedBrand) {
      sortedItems = sortedItems.filter((item) => item.Brand === selectedBrand);
    }

    setItems(
      sortedItems.length > 0
        ? sortedItems
        : [{ Name: "Sorry, we do not have an item matching your criteria" }]
    );
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
  };

  const handleBrandChange = (event) => {
    const selectedBrand = event.target.value;
    setSelectedBrand(selectedBrand);
  };

  const handlePriceSort = (event) => {
    const selectedPriceSort = event.target.value;
    setPriceSort(selectedPriceSort);
  };

  const resetSorting = () => {
    setSelectedCategory("");
    setSelectedBrand("");
    setPriceSort("");
    setItems(originalItems);
  };

  useEffect(() => {
    applySorting();
  }, [selectedCategory, selectedBrand, priceSort]);

  return (
    <div className="sortContainer">
      <div className="sort">
        <div>
          <h3>Sort Items by:</h3>
        </div>
        <div className="dropDownCategory">
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="dropDownBrand">
          <select value={selectedBrand} onChange={handleBrandChange}>
            <option value="">Brand</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div className="dropDownPrice">
          <select value={priceSort} onChange={handlePriceSort}>
            <option value="">Price</option>
            <option value="lowest">Lowest to Highest</option>
            <option value="highest">Highest to Lowest</option>
          </select>
        </div>
        <button className="resetBtn" onClick={resetSorting}>
          {" "}
          Reset{" "}
        </button>
      </div>
    </div>
  );
};

export default SortItems;
