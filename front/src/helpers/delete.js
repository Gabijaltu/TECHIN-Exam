
import api from "../utils/api";

export const deleteItem = async (id) => {
  try {
    await api.delete(`/services/${id}`);
  } catch (err1) {
    try {
      await api.delete(`/masters/${id}`);
    } catch (err2) {
      throw new Error(`Failed to delete item with id ${id} from services or masters.`);
    }
  }
};
