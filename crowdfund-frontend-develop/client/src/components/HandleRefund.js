import React, { useState } from "react";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { ContributionAPI } from "../apis/contributionAPI";
import { useStateContext } from "../context/index";
import { displaySuccess } from "../utils";
import { useRouter } from "next/router";
const HandleRefund = ({ btnType, title, styles, isDisabled, address, id }) => {
  const { contract } = useContract(address);
  const { token } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync: refund } = useContractWrite(contract, "refund");
  const router = useRouter();
  const handleClick = async () => {
    try {
      setIsLoading(true);
      const data = await refund();
      console.info("contract call successs", data);
      if (data) {
        await ContributionAPI.refund(id, token);
      }
      displaySuccess("Refunded Successfuly!");
      router.push("/my-contributions");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log("contract call failure", err);
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
          {title}
        </button>
      )}
    </>
  );
};

export default HandleRefund;
