import React, { useState, useEffect } from "react";
import {
  useContract,
  useContractWrite,
  useContractRead,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import FormField from "../../../src/components/FormField";
import CustomButton from "../../../src/components/CustomButton";
import Loader from "../../../src/components/Loader";
import { ethers } from "ethers";
import Swal from "sweetalert2";
import { useStateContext } from "../../../src/context";
const NewRequest = () => {
  const {address} = useStateContext();
  const [form, setForm] = useState({
    description: "",
    amount: "",
    recipient: "",
  });
  const router = useRouter();
  const { contract } = useContract(router.query.address);
  const { data: isOwner, isLoading: isLoadingOwner } = useContractRead(contract, "isOwner", address)
  useEffect(() => {
    if (isOwner === false) {
      router.push("/");
    }
  }, [isOwner]);
  const { mutateAsync: createRequest, isLoading } = useContractWrite(
    contract,
    "createRequest"
  );

  const call = async ({ description, amount, recipient }) => {
    try {
      const data = await createRequest([description, amount, recipient]);
      Swal.fire({
        title: "Sweet!",
        text: "Successfully Created!",
        imageUrl: "/thirdweb.svg",
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: "logo",
      });
      router.push(`/my-campaigns/${router.query.address}/requests`);
      console.info("contract call successs", data);
    } catch (err) {
      Swal.fire({
        title: "Failed!",
        text: `Campaign has not succeeded yet!`,
        imageUrl: "/thirdweb.svg",
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: "logo",
      });
    }
  };

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await call({
      ...form,
      amount: ethers.utils.parseUnits(form.amount, 18).toString(),
    });
  };
  return (
    <>
      {isLoading || isLoadingOwner ? (
        <Loader />
      ) : (
        <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
          <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
            <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
              Start a Request
            </h1>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full mt-[65px] flex flex-col gap-[30px]"
          >
            <div className="flex flex-wrap gap-[40px]">
              <FormField
                labelName="Amount"
                placeholder="Amount in ETH"
                inputType="text"
                value={form.amount}
                handleChange={(e) => handleFormFieldChange("amount", e)}
              />
              <FormField
                labelName="Recipient"
                placeholder="Recipient address"
                inputType="text"
                value={form.recipient}
                handleChange={(e) => handleFormFieldChange("recipient", e)}
              />
            </div>

            <FormField
              labelName="Description"
              placeholder="Why you need it?"
              isTextArea
              value={form.description}
              handleChange={(e) => handleFormFieldChange("description", e)}
            />
            <div className="flex justify-center items-center mt-[40px]">
              <CustomButton
                btnType="submit"
                title="Submit new request"
                styles="bg-[#1dc071]"
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default NewRequest;
