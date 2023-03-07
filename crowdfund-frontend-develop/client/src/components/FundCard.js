import React from "react";

import { daysLeft } from "../utils";
import Image from "next/image";
import CustomButton from "./CustomButton";
import Link from "next/link";
import { useRouter } from "next/router";
const FundCard = ({
  _id,
  state,
  title,
  description,
  goal,
  endAt,
  pledged,
  image,
  handleClick,
  address,
  handleDeployClick,
  handleNewRequestsClick,
  handleRequestsClick,
}) => {
  const router = useRouter();
  const remainingDays = daysLeft(endAt);
  return (
    <div className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] ">
      <Image
        src={image}
        width={1000}
        height={1000}
        alt="fund"
        className="w-full h-[158px] object-cover rounded-[15px] cursor-pointer"
        onClick={handleClick}
      />

      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-[18px]">
          <Image
            src={"/type.svg"}
            height={1000}
            width={1000}
            alt="tag"
            className="w-[17px] h-[17px] object-contain"
          />
          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">
            Education
          </p>
        </div>

        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">
            {title}
          </h3>
          <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">
            {description}
          </p>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {pledged}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Raised of {goal}
            </p>
          </div>
          {remainingDays > 0 ? (
            <div className="flex flex-col">
              <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
                {remainingDays}
              </h4>
              <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
                Days Left
              </p>
            </div>
          ) : (
            <div className="flex flex-col">
              <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
                It's Over
              </h4>
            </div>
          )}
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <Image
              src={"/thirdweb.svg"}
              height={1000}
              width={1000}
              alt="user"
              className="w-1/2 h-1/2 object-contain"
            />
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">
            status: <span className="text-[#b2b3bd]">{state}</span>
          </p>
          {/* {state === "approved" && (
            <CustomButton
              btnType="button"
              title="Deploy"
              styles="bg-[#1dc071]"
              onClick={handleDeployClick}
            />
          )} */}
        </div>
        {state === "deployed" &&
          router.pathname.startsWith("/my-campaigns") && (
            <div className="text-center">
              <br />
              <Link
                href={`/my-campaigns/${address}/requests`}
                className="block"
              >
                <CustomButton
                  btnType="button"
                  title="Requests"
                  styles="bg-[#1dc071]"
                />
              </Link>
              <br />
              <Link href={`/my-campaigns/${address}/new-request`} className="block">
                <CustomButton
                  btnType="button"
                  title="New Requests"
                  styles="bg-[#8C6DFD]"
                />
              </Link>
            </div>
          )}
      </div>
    </div>
  );
};

export default FundCard;
