import "../styles/globals.css";
import type { AppProps } from "next/app";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { WalletContext } from "@solana/wallet-adapter-react";
import WalletContextProvider from "../components/WalletContextProvider";

const colors = {
  background: "#1F1F1F",
  accent: "#833BBE",
  bodyText: "rgba(255, 255, 255, 0.8)",
};

const theme = extendTheme({ colors, config: { initialColorMode: "dark" } });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <WalletContextProvider>
        <Component {...pageProps} />
      </WalletContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
