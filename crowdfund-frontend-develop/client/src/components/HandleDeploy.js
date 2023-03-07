import React, { useState } from "react";
import { useStateContext } from "../context/index";
import { ethers } from "ethers";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { displayError, displaySuccess } from "../utils";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { CampaignAPI } from "../apis/campaignAPI";

const HandleDeploy = ({
  isDisabled,
  buttonTitle,
  styles,
  btnType,
  ///////
  id,
  name,
  title,
  description,
  image,
  target,
  deadline,
  min,
}) => {
  const router = useRouter();
  const { token } = useStateContext();
  const { publishCampaign } = useStateContext();
  const { contract } = useContract(
    "0xC01cb8f8EA2D8324cb8d302dD4469278E39ff536"
  );
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async () => {
    console.log(
      name,
      title,
      description,
      image,
      ethers.utils.parseUnits(target.toString(), 18),
      new Date(deadline).getTime(),
      ethers.utils.parseUnits(min.toString(), 18)
    );
    const form = {
      name,
      title,
      description,
      image,
      target: ethers.utils.parseUnits(target.toString(), 18),
      deadline: new Date(deadline).getTime(),
      min: ethers.utils.parseUnits(min.toString(), 18),
    };
    try {
      setIsLoading(true);
      const data = await publishCampaign(form);

      console.log("contract call successs", data.receipt.logs);
      if (data) {
        // const campaign = await getDeployedCampaigns().slice(-1);
        const campaigns = await contract.call("getDeployedCampaigns");
        const oneCampaign = campaigns[campaigns.length - 1];
        console.log("Campaigns: ", oneCampaign);
        await CampaignAPI.addAddress(id, oneCampaign, token);
        displaySuccess("Successfully Deployed!");
        router.push("/my-campaigns");
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  return (
    <>
      {isLoading ? (
        <button
          disabled={isDisabled}
          type={btnType}
          className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] disabled:opacity-50 flex justify-center ${styles}`}
          onClick={handleClick}
        >
          <img src="/loader.svg" alt="loader" className="w-[50px] " />
        </button>
      ) : (
        <button
          disabled={isDisabled}
          type={btnType}
          className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] disabled:opacity-50 ${styles}`}
          onClick={handleClick}
        >
          {buttonTitle}
        </button>
      )}
    </>
  );
};

export default HandleDeploy;
