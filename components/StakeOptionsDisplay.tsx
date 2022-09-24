import { Button, Text, VStack } from "@chakra-ui/react"
import { useCallback } from "react"

interface Props {
	isStaking: boolean,
	daysStaked: number,
	totalEarned: number,
	claimable: number
}

const StakeOptionsDisplay = ({ isStaking, daysStaked, totalEarned, claimable }: Props) => {
	const handleStake = useCallback(() => { }, [])
	const handleUnstake = useCallback(() => { }, [])
	const handleClaim = useCallback(() => { }, [])

	return (
		<VStack bg="brand.secondary" rounded="2xl" as="b" fontSize="sm" px={12} py={6} spacing={4}>
			<Text bgColor="brand.tertiary" padding="4px 8px" rounded="full" as="b" fontSize="sm">
				{isStaking ? `STAKING ${daysStaked} DAY${daysStaked > 1 ? "S" : ""}` : "READY TO STAKE"}
			</Text>
			<VStack spacing={2}>
				<Text color="white" as="b" fontSize="4xl">{isStaking ? `${totalEarned} $SHIP` : "0 $SHIP"}</Text>
				<Text>{isStaking ? `${claimable} $SHIP earned` : "earn $SHIP by staking"}</Text>
			</VStack>

			<Button onClick={isStaking ? handleClaim : handleStake} colorScheme="accent">
				{isStaking ? "claim $SHIP" : "stake shipoor"}
			</Button>
			{isStaking && <Button onClick={handleUnstake} colorScheme="purple">unstake</Button>}
		</VStack>
	)
}

export default StakeOptionsDisplay
