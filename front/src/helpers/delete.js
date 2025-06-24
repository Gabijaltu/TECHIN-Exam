import api from "../utils/api";

export const deleteItem = async (id) => {
  await api.delete(`/ads_platform/${id}`);
};
