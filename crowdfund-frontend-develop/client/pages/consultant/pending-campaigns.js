import React from "react";
import { useStateContext } from "../../src/context";
import { ConsultantAPI } from "../../src/apis/consultantAPI";
import FundCard from "../../src/components/FundCard";
import { useRouter } from "next/router";
const PendingCampaigns = (props) => {
  const router = useRouter();
  
  const filteredCampaigns = props.response.filter(
    (campaign) => campaign.state === "pending"
  );
  const { role } = useStateContext();
  if (role) {
    return (
      <div>
        <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
          All Campaigns {filteredCampaigns.length}
        </h1>
        <div className="flex flex-wrap mt-[20px] gap-[26px]">
          {filteredCampaigns.length === 0 && (
            <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
              There are no campaigns yet!
            </p>
          )}
          {filteredCampaigns.length > 0 &&
            filteredCampaigns.map((campaign) => (
              <FundCard
                key={campaign}
                {...campaign}
                handleClick={() => router.push(`/campaign/${campaign["_id"]}`)}
              />
            ))}
        </div>
      </div>
    );
  }
  return <div>Not Authorized</div>;
};

export default PendingCampaigns;

export async function getServerSideProps({ req }) {
  const accessToken = req.cookies.token;

  try {
    const response = await ConsultantAPI.getPendingCampaigns(accessToken);
    return {
      props: { response },
    };
  } catch (err) {
    console.log(err);
    return { props: {} };
  }
}
