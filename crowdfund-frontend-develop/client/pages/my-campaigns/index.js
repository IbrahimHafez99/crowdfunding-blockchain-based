import React from "react";
import { CampaignAPI } from "../../src/apis/campaignAPI";
import { useRouter } from "next/router";
import FundCard from "../../src/components/FundCard";
import HandleDeploy from "../../src/components/HandleDeploy";
import Loader from "../../src/components/Loader";
const MyCampaigns = (props) => {
  const campaigns = props.response;
  let pendingCampaigns, approvedCampaigns, deployedCampaigns, rejectedCampaigns;
  if (campaigns) {
    pendingCampaigns = campaigns.filter(
      (campaign) => campaign.state === "pending"
    );
    approvedCampaigns = campaigns.filter(
      (campaign) => campaign.state === "approved"
    );
    deployedCampaigns = campaigns.filter(
      (campaign) => campaign.state === "deployed"
    );
    rejectedCampaigns = campaigns.filter(
      (campaign) => campaign.state === "rejected"
    );
  }

  const router = useRouter();
  const handleDeploy = async () => {
    console.log("Clicked");
  };
  const handleRequestsClick = () => {
    router.push(`/my-campaigns/${campaign["_id"]}/requests`);
  };

  return (
    <>
      {deployedCampaigns ? (
        <div>
          <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
            All Deployed Campaigns {deployedCampaigns.length}
          </h1>
          <div className="flex flex-wrap mt-[20px] gap-[26px]">
            {deployedCampaigns.length === 0 && (
              <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
                You have not deployed any campigns yet
              </p>
            )}
            {deployedCampaigns.length > 0 &&
              deployedCampaigns.map((campaign) => (
                <FundCard
                  key={campaign["_id"]}
                  {...campaign}
                  handleClick={() =>
                    router.push(`/campaign/${campaign["_id"]}`)
                  }
                  handleRequestsClick={handleRequestsClick}
                  handleNewRequestsClick={() =>
                    router.push(`/my-campaigns/${campaign["_id"]}/new-request`)
                  }
                />
              ))}
          </div>
        </div>
      ) : (
        <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
          There are no deployed campaigns.
        </h1>
      )}
      <br />
      <hr />
      <br />
      {pendingCampaigns ? (
        <div>
          <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
            All Pending Campaigns {pendingCampaigns.length}
          </h1>
          <div className="flex flex-wrap mt-[20px] gap-[26px]">
            {pendingCampaigns.length === 0 && (
              <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
                You have not created any campigns yet
              </p>
            )}
            {pendingCampaigns.length > 0 &&
              pendingCampaigns.map((campaign) => (
                <FundCard
                  key={campaign["_id"]}
                  {...campaign}
                  handleClick={() =>
                    router.push(`/campaign/${campaign["_id"]}`)
                  }
                />
              ))}
          </div>
        </div>
      ) : (
        <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
          There are no pending campaigns.
        </h1>
      )}
      <br />
      <hr />
      <br />
      {approvedCampaigns ? (
        <div>
          <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
            All Approved Campaigns {approvedCampaigns.length}
          </h1>
          <div className="flex flex-wrap mt-[20px] gap-[26px]">
            {approvedCampaigns.length === 0 && (
              <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
                There are no approved campaigns. yet!
              </p>
            )}
            {approvedCampaigns.length > 0 &&
              approvedCampaigns.map((campaign) => (
                <div
                  className="flex flex-col gap-[10px] justify-center"
                  key={campaign["_id"]}
                >
                  <FundCard
                    {...campaign}
                    handleClick={() =>
                      router.push(`/campaign/${campaign["_id"]}`)
                    }
                  />
                  <HandleDeploy
                    buttonTitle="Deploy"
                    styles={"bg-[purple]"}
                    btnType="button"
                    ///////
                    id={campaign["_id"]}
                    name={campaign.name}
                    title={campaign.title}
                    description={campaign.description}
                    image={campaign.image}
                    target={campaign.goal}
                    deadline={campaign.endAt}
                    min={campaign.minPledge}
                  />
                </div>
              ))}
          </div>
        </div>
      ) : (
        <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
          There are no approved campaigns.
        </h1>
      )}
      <br />
      <hr />
      <br />
      {rejectedCampaigns ? (
        <div>
          <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
            All Rejected Campaigns {rejectedCampaigns.length}
          </h1>
          <div className="flex flex-wrap mt-[20px] gap-[26px]">
            {rejectedCampaigns.length === 0 && (
              <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
                There are no rejected campaign. yet!
              </p>
            )}
            {rejectedCampaigns.length > 0 &&
              rejectedCampaigns.map((campaign) => (
                <FundCard
                  key={campaign["_id"]}
                  {...campaign}
                  handleClick={() =>
                    router.push(`/campaign/${campaign["_id"]}`)
                  }
                />
              ))}
          </div>
        </div>
      ) : (
        <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
          There are no rejected campaigns.
        </h1>
      )}
    </>
  );
};

export default MyCampaigns;

export async function getServerSideProps({ req }) {
  const accessToken = req.cookies.token;
  try {
    const response = await CampaignAPI.getMyCampaigns(accessToken);
    return {
      props: { response },
    };
  } catch (err) {
    console.log(err);
    return { props: {} };
  }
}
