import api from "../utils/api";

export const postService = async (data) => {
  const response = await api.post(`/services`, data);
  return response.data;
};

export const postMaster = async (data) => {
  const response = await api.post(`/masters`, data);
  return response.data;
};
