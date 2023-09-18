const searchActiveProduct = async (productName) => {
    try {
      const response = await fetch(`http://localhost:8080/products/${productName}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
  
      const products = await response.json();
  
      if (!products || products.length === 0) {
        alert("No active products found with that name.");
      } else {
        console.log(products);
      }
  
      return products; 
    } catch (error) {
      console.error(error);
      alert("Server error.");
      throw error;
    }
  };
  
  export default searchActiveProduct;
  