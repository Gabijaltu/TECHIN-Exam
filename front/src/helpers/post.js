import axios from "axios";
import { URL } from "../helpers/localhostURL"

export const post = async (data) => {
    const response = await axios.post(`${URL}/api/items`, data);
    
    return response.data;
  };

  export const postRegistration = async (tripDateId, user) => {
    const response = await axios.post(
      `${URL}/api/items/${tripDateId}/register`,
      {},
      {
        auth: {
          username: user.username,
          password: user.password,
        },
      }
    );
    console.log(response.data);
    return response.data;
  }