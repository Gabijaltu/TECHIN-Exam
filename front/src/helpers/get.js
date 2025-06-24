import api from "../utils/api";

export const getAllData = async () => {
  const response = await api.get();
  return response.data;
};

export const getOne = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};