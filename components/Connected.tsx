import {
	Container,
	Heading,
	VStack,
	Text,
	HStack,
	Button,
	Image,
} from "@chakra-ui/react";
import {
	CandyMachine,
	Metaplex,
	walletAdapterIdentity,
} from "@metaplex-foundation/js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useRouter } from "next/router";
import {
	MouseEventHandler,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";

const Connected = () => {
	const { connection } = useConnection();
	const walletAdapter = useWallet();
	const [isMinting, setIsMinting] = useState(false);

	const [candyMachine, setCandyMachine] = useState<CandyMachine>();

	const metaplex = useMemo(() => {
		return Metaplex.make(connection).use(walletAdapterIdentity(walletAdapter));
	}, [connection, walletAdapter]);

	const router = useRouter();

	const handleMintShipoor: MouseEventHandler<HTMLButtonElement> = useCallback(
		async e => {
			if (e.defaultPrevented) return;

			if (!walletAdapter.connected || !candyMachine) {
				return;
			}

			try {
				setIsMinting(true);
				const nft = await metaplex.candyMachines().mint({ candyMachine }).run();

				console.log(nft);
				router.push(`/new-mint?mint=${nft.nft.address.toBase58()}`);
			} catch (err) {
				alert(err);
			} finally {
				setIsMinting(false);
			}
		},
		[candyMachine, metaplex, walletAdapter]
	);

	useEffect(() => {
		if (!metaplex) return;

		metaplex
			.candyMachines()
			.findByAddress({
				address: new PublicKey(process.env.NEXT_PUBLIC_CANDY_MACHINE_ADDRESS ?? ""),
			})
			.run()
			.then(candyMachine => {
				console.log(candyMachine);
				setCandyMachine(candyMachine);
			})
			.catch(err => {
				alert(err);
			});
	}, [metaplex]);

	return (
		<Container>
			<VStack spacing={24} alignItems="center">
				<Container>
					<VStack spacing={8}>
						<Heading
							fontSize="3xl"
							color="white"
							as="h1"
							textAlign="center"
							noOfLines={2}
						>
							Welcome Shipoor.
						</Heading>
						<Text fontSize="xl" textAlign="center">
							Each shipoor is randomy generated and can be staked to receive{" "}
							<b> $SHIP</b>. Use your <b> $SHIP</b> to upgrade your shipoor and
							receive perks within the community!
						</Text>
					</VStack>
				</Container>
				<HStack spacing={12} overflowX="scroll" w="100vw" px={32}>
					<Image src="avatar1.png" alt="" />
					<Image src="avatar2.png" alt="" />
					<Image src="avatar3.png" alt="" />
					<Image src="avatar4.png" alt="" />
					<Image src="avatar5.png" alt="" />
				</HStack>

				<Button
					colorScheme="accent"
					maxW="300px"
					onClick={handleMintShipoor}
					isLoading={isMinting}
				>
					mint shipoor
				</Button>
			</VStack>
		</Container>
	);
};

export default Connected;
