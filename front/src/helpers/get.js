import axios from "axios";
import { URL } from "../helpers/localhostURL"

export const getAllData = async () => {
  const response = await axios.get(URL);
  return response.data;
};

export const getOne = async (id) => {
  const response = await axios.get(`${URL}/${id}`);
  return response.data;
};

export const getMyTrips = async (user) => {
  const response = await axios.get(`${URL}/my`, {
    auth: {
      username: user.username,
      password: user.password,
    },
  });
  console.log(response.data);
  return response.data;
}