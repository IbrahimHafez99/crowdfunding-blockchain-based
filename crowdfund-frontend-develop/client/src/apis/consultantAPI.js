import { api } from "./configs/axiosConfigs";

export const ConsultantAPI = {
  getPendingCampaigns: async function (token) {
    const response = await api.request({
      url: `api/campaigns/consultation`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.campaigns;
  },
  updateStatus: async function (id, data, token) {
    const response = await api.request({
      url: `api/campaigns/consultation/${id}`,
      method: "PATCH",
      data: { result: data },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
