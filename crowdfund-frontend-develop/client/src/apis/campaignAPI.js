import { api } from "./configs/axiosConfigs";
import { ethers } from "ethers";

// const tx = await randomSVG.create()
// Wait until the tx has been confirmed (default is 1 confirmation)
// const receipt = await tx.wait()
// Receipt should now contain the logs
// console.log(receipt.logs)
export const CampaignAPI = {
  create: async function (
    { title, description, image, target, deadline, min },
    token
  ) {
    const response = await api.request({
      url: `api/campaigns`,
      method: "POST",
      data: {
        title,
        description,
        image,
        goal: target,
        endAt: deadline,
        minPledge: min,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },
  getAllDeployed: async function () {
    const response = await api.request({
      url: `api/campaigns/deployed`,
      method: "GET",
    });
    return response.data.data.campaigns;
  },
  getCampaign: async function (id) {
    const response = await api.request({
      url: `api/campaigns/${id}`,
      method: "GET",
    });
    console.log(response);
    return response.data.data.campaign;
  },
  getMyCampaigns: async function (token) {
    const response = await api.request({
      url: `api/campaigns/mine`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.campaigns;
  },
  addAddress: async function (id, address, token) {
    console.log("FROM CAMPAIGN API ADDADDRESS METHOD: ", address);
    console.log("ID: ", id);
    const response = await api.request({
      url: `api/campaigns/deployed`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { id, address },
    });
    return response;
  },
  finalizeRequest: async function (address, amount) {
    console.log(address, amount)
    const response = await api.request({
      url: `api/campaigns/deployed/requests/finalize`,
      method: "PATCH",
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      data: { address, amount: amount * 1 },
    });
    return amount;
  },
};
