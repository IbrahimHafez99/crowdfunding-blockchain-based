import { api } from "./configs/axiosConfigs";

export const ContributionAPI = {
  fund: async function ({ campaignId, amount }, token) {
    const response = await api.request({
      url: `api/contributions/fund`,
      method: "POST",
      data: { campaignId, amount: amount * 1 },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },
  getAll: async function (token) {
    const response = await api.request({
      url: `api/contributions/mine`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.contributions;
  },
  refund: async function (campaignId, token) {
    const response = await api.request({
      url: `api/contributions/refund`,
      method: "DELETE",
      data: { campaignId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },
};
