import { Flex, Heading, HStack, Text, VStack, Image, Center } from "@chakra-ui/react";
import { PublicKey } from "@solana/web3.js";
import { NextPage } from "next";
import { useState } from "react";
import ItemBox from "../components/ItemBox";
import MainLayout from "../components/MainLayout";
import StakeOptionsDisplay from "../components/StakeOptionsDisplay";

interface StakeProps {
	mint: PublicKey,
	imageSrc: string
}

const StakePage: NextPage<StakeProps> = ({ mint, imageSrc }) => {
	const [isStaking, setIsStaking] = useState(true);
	const [level, setLevel] = useState(1);

	return (
		<MainLayout>
			<VStack spacing={8} justify="flex-start" align="flex-start" px={8}>
				<Heading as="h1" color="white" size="2xl">Level up your shipoor</Heading>
				<Text fontSize="xl" textAlign="start" maxWidth="600px">Stake your shipoor to earn 10 $SHIP per day to get access to a randomized loot box full of upgrades for your shipoor</Text>
				<HStack spacing={24} alignItems="flex-start">
					<VStack align="flex-start" minW="200px">
						<Flex flexDirection="column">
							<Image src={imageSrc ?? ""} alt="shipoor nft" zIndex={1} />
							<Center bgColor="accent.secondary" borderRadius="0 0 8px 8px" mt="-8px" zIndex={2} h="32px">
								<Text color="white" as="b" fontSize="md" w="100%" textAlign="center">
									{isStaking ? "STAKING" : "UNSTAKED"}
								</Text>
							</Center>
						</Flex>
						<Text fontSize="2xl" as="b" color="white">
							LEVEL {level}
						</Text>
					</VStack>
					<VStack alignItems="flex-start" spacing={12}>
						<StakeOptionsDisplay isStaking={isStaking} daysStaked={6} totalEarned={60} claimable={40} />
						<HStack spacing={12}>
							<VStack alignItems="flex-start" >
								<Text color="white" as="b" fontSize="2xl">
									Gear
								</Text>
								<HStack>
									<ItemBox>mock</ItemBox>
									<ItemBox>mock</ItemBox>
								</HStack>
							</VStack>
						</HStack>
					</VStack>
					<VStack alignItems="flex-start" spacing={12}>
						<StakeOptionsDisplay isStaking={isStaking} daysStaked={6} totalEarned={60} claimable={40} />
						<HStack spacing={12}>
							<VStack alignItems="flex-start" >
								<Text color="white" as="b" fontSize="2xl">
									Loot Boxes
								</Text>
								<HStack>
									<ItemBox>mock</ItemBox>
									<ItemBox>mock</ItemBox>
									<ItemBox>mock</ItemBox>
								</HStack>
							</VStack>
						</HStack>
					</VStack>
				</HStack>
			</VStack>
		</MainLayout>
	)
}

StakePage.getInitialProps = async ({ query: { mint, imageSrc } }) => {
	if (!mint) throw { error: "no mint" };
	if (!imageSrc) throw { error: "no imageSrc" };

	try {
		const mintPubKey = new PublicKey(mint as string);
		return {
			mint: mintPubKey,
			imageSrc: imageSrc as string
		};
	} catch (err) {
		throw { error: "invalid mint" };
	}
}

export default StakePage;
