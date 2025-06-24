import axios from "axios";
import { URL } from "../helpers/localhostURL"

export const deleteItem = async (id) => {
  await axios.delete(`${URL}/api/items/${id}`);
};
