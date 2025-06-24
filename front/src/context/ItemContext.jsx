import React, { createContext, useState, useEffect } from "react";
import api from "../utils/api";

export const ItemContext = createContext(
  undefined
);

export function ItemProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get(`/ads_platform`);
        setItems(response.data);
      } catch (err) {
        setError("fail");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);


  const removeItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <ItemContext.Provider value={{ items, loading, error, removeItem }}>
      {children}
    </ItemContext.Provider>
  );
}

export const useItemContext = () => {
  const context = React.useContext(ItemContext);
  if (!context) {
    throw new Error("useContext must be used within ItemContext");
  }
  return context;
};