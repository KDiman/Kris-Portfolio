import { createContext, useState, useEffect } from "react";

const InActiveItemsContext = createContext();

const InActiveItemsProvider = (props) => {
  const [items, setItems] = useState([])

    useEffect(() => {
      fetch("http://localhost:8080/products/inactive")
        .then((response) => response.json())
        .then((data) => setItems(data))
        .catch((error) => console.error("Error fetching active products:", error));
    }, [])

    return (
        <InActiveItemsContext.Provider value={[items, setItems]}>
          {props.children}
        </InActiveItemsContext.Provider>
      );
    };
    
    export { InActiveItemsContext, InActiveItemsProvider };
    