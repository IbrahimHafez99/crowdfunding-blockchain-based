import React, { useContext, createContext, useState } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(false);

  const address = useAddress();
  const connect = useMetamask();
  //related to Factory Smart Contract

  //getting the address(contract) of the FactoryCampaign contract
  const { contract } = useContract(
    "0xC01cb8f8EA2D8324cb8d302dD4469278E39ff536"
  );

  //getting the createCampaign function
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  //creating the functionality of the creation of a campaign
  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        form.name,
        form.title,
        form.description,
        form.image,
        form.target,
        form.deadline.toString(), //unix based timestamp
        form.min,
      ]);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        publishCampaign,
        contract,
        connect,
        token,
        setToken,
        role,
        setRole,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
