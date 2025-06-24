import api from "../utils/api";

export const post = async (data) => {
  const response = await api.post(`/ads_platform`, data);

  return response.data;
};

export const putData = async (id, data) => {
  const response = await api.put(`/ads_platform/${id}`, data, {
    auth: {
      username: user.username,
      password: user.password,
    },
  });
  return response.data;
};
