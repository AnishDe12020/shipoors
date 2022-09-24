import {
	Container,
	Heading,
	VStack,
	Text,
	Image,
	Button,
} from "@chakra-ui/react";
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
	MouseEventHandler,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import MainLayout from "../components/MainLayout";

interface NewMintProps {
	mint: PublicKey;
}

const NewMint: NextPage<NewMintProps> = ({ mint }) => {
	const router = useRouter()

	const [metadata, setMetadata] = useState<any>();

	const { connection } = useConnection();
	const walletAdapter = useWallet();

	const metaplex = useMemo(() => {
		return Metaplex.make(connection).use(walletAdapterIdentity(walletAdapter));
	}, [connection, walletAdapter]);

	const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
		async e => {
			if (e.defaultPrevented) return;
			router.push(`/stake?mint=${mint}&imageSrc=${metadata?.image}`)
		},
		[router, mint, metadata]
	);

	useEffect(() => {
		metaplex
			.nfts()
			.findByMint({ mintAddress: mint })
			.run()
			.then(nft => {
				fetch(nft.uri)
					.then(res => res.json())
					.then(metadata => {
						setMetadata(metadata);
					})
					.catch(err => {
						console.log(err);
					});
			})
			.catch(err => {
				console.log(err);
			});
	}, [mint, metaplex, walletAdapter]);

	return (
		<MainLayout>
			<VStack spacing={24}>
				<Container>
					<VStack spacing={8}>
						<Heading color="white" as="h1" size="2xl" textAlign="center">
							A new shipoor has appeared! 🚀
						</Heading>
						<Text color="bodyText">
							Congrats, you minted a level 1 shipoor <br /> Time to stake your
							character to earn rewards and level up!
						</Text>
					</VStack>
				</Container>
				<Image src={metadata?.image ?? ""} alt="" />

				<Button
					colorScheme="accent"
					maxW="380px"
					onClick={handleClick}
				>
					stake my shipoor
				</Button>
			</VStack>
		</MainLayout>
	);
};

NewMint.getInitialProps = async ({ query: { mint } }) => {
	if (!mint) throw { error: "no mint" };

	try {
		const mintPubKey = new PublicKey(mint as string);
		return {
			mint: mintPubKey,
		};
	} catch (err) {
		throw { error: "invalid mint" };
	}
};

export default NewMint;
