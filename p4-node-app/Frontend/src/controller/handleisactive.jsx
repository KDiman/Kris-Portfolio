const handleDelist = async (productId, setIsDelisting) => {
    try {
      setIsDelisting(true);
  
      const updatedData = {
        isActive: false,
      };
  
      const response = await fetch(
        `http://localhost:8080/products/delist/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );
  
      if (response.ok) {
        console.log("Item is delisted");
      } else {
        console.error("Error delisting product:", response.statusText);
      }
    } catch (error) {
      console.error("Error delisting product:", error);
    } finally {
      setIsDelisting(false);
    }
  };
  
  export default handleDelist;
  