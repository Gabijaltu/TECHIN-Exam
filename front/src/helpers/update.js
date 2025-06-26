import api from "../utils/api";

export const updateService = async (id, data) => {
  const response = await api.patch(`/services/${id}`, data);
  return response.data;
};

export const putService = async (id, data) => {
  const response = await api.put(`/services/${id}`, data);
  return response.data;
};

export const updateServiceStatus = async (id, status) => {
  const payload = { status };
  const response = await api.patch(`/services/${id}/review`, payload);
  return response.data;
};

export const updateMaster = async (id, data) => {
  const response = await api.patch(`/masters/${id}`, data);
  return response.data;
};

export const putMaster = async (id, data) => {
  const response = await api.put(`/masters/${id}`, data);
  return response.data;
};
