import api from "../utils/api";

export const post = async (data) => {
  const response = await api.post(`/items`, data);

  return response.data;
};

export const putData = async (id, data) => {
  const response = await api.put(`/items/${id}`, data);
  return response.data;
};
