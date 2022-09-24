import "../styles/globals.css";
import type { AppProps } from "next/app";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import WalletContextProvider from "../components/WalletContextProvider";

import {
	components,
	mainColors,
	accentBlue,
	accentBlueTokens,
	stateColors,
} from "@orbits-ui/chakra-theme";

const theme = extendTheme({
	components,
	colors: { ...accentBlue },
	semanticTokens: {
		colors: { ...mainColors, ...accentBlueTokens, ...stateColors },
	},
	styles: {
		global: {
			"html, body": {
				background: "brand.primary",
			},
		},
	},
	config: {
		initialColorMode: "dark",
		useSystemColorMode: true,
	},
});

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
