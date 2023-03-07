import { api } from "./configs/axiosConfigs";

export const LoginAPI = {
  login: async function ({ email, password }) {
    const response = await api.request({
      url: `api/users/login`,
      method: "POST",
      data: { email, password },
    });
    return response.data;
  },
};
