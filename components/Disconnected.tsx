import { Button, Container, Heading, VStack } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { MouseEventHandler, useCallback } from "react";

const Disconnected = () => {
	const modalState = useWalletModal();
	const { wallet, connect } = useWallet();

	const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
		e => {
			if (e.defaultPrevented) return;

			if (!wallet) {
				modalState.setVisible(true);
			} else {
				connect().catch(() => { });
			}
		},
		[wallet, connect, modalState]
	);

	return (
		<Container>
			<VStack spacing={24}>
				<Heading
					fontSize="3xl"
					color="white"
					as="h1"
					textAlign="center"
					noOfLines={2}
				>
					Mint your shipoor. Earn $SLD. Level up.
				</Heading>
				<Button maxW="300px" onClick={handleClick} colorScheme="accent">
					become a shipoor 🚀
				</Button>
			</VStack>
		</Container>
	);
};

export default Disconnected;
