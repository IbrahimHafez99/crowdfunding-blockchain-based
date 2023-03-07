import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
//thats what makes tailwind work (importing the globals.css which imports tailwind things)
import "../styles/globals.css";
import RequiredAuth from "../src/components/RequiredAuth";
import Layout from "../src/components/Layout";
import { StateContextProvider } from "../src/context/index";
// This is the chainId your dApp will work on.
const activeChainId = ChainId.Goerli;

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <StateContextProvider>
        <RequiredAuth>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RequiredAuth>
      </StateContextProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
