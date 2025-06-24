import api from "../utils/api";

export const update = async (id, data) => {
    const response = await api.patch(`/${id}`, data)
    return response.data;
}

export const putData = async (id, data) => {
    const response = await api.put(`/items/${id}`, data)
    return response.data;
}

export const updateStatus = async (id, status) => {
    const payload = { status };
    const response = await api.patch(`/items/${id}/review`, payload);
    return response.data;
  };