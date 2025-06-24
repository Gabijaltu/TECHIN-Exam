import React, { createContext, useState, useEffect } from "react";
import api from "../utils/api";

export const ItemContext = createContext(undefined);

export function ItemProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get(`/items`);
        setItems(response.data);
      } catch (err) {
        setError("Failed to load items");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const removeItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateItem = (updatedItem) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  return (
    <ItemContext.Provider
      value={{ items, loading, error, removeItem, updateItem }}
    >
      {children}
    </ItemContext.Provider>
  );
}

export const useItemContext = () => {
  const context = React.useContext(ItemContext);
  if (!context) {
    throw new Error("useItemContext must be used within an ItemProvider");
  }
  return context;
};
