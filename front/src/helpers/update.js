import axios from "axios";
import { URL } from "../helpers/localhostURL"

export const update = async (id, data) => {
    const response = await axios.patch(`${URL}/${id}`, data)
    return response.data;
}

export const putData = async (id, data) => {
    const response = await axios.put(`${URL}/${id}`)
    return response.data;
}

export const updateStatus = async (id, status) => {
    const payload = { status };
    const response = await axios.patch(`${URL}/api/items/${id}/review`, payload);
    return response.data;
  };