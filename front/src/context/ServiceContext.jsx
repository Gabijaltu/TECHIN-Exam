import React, { createContext, useState, useEffect } from "react";
import api from "../utils/api";

export const ServiceContext = createContext(undefined);

export function ServiceProvider({ children }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get(`/services`);
        setServices(response.data);
      } catch (err) {
        setError("Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const removeService = (id) => {
    setServices((prevServices) => prevServices.filter((service) => service.id !== id));
  };

  const updateService = (updatedService) => {
    setServices((prevServices) =>
      prevServices.map((service) => (service.id === updatedService.id ? updatedService : service))
    );
  };

  return (
    <ServiceContext.Provider
      value={{ services, loading, error, removeService, updateService }}
    >
      {children}
    </ServiceContext.Provider>
  );
}

export const useServiceContext = () => {
  const context = React.useContext(ServiceContext);
  if (!context) {
    throw new Error("useServiceContext must be used within an ServiceProvider");
  }
  return context;
};
