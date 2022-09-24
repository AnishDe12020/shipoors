import { Center } from "@chakra-ui/react"
import { ReactNode } from "react"

interface Props {
	children: ReactNode,
	bgColor?: string,
}

const ItemBox = ({ children, bgColor }: Props) => {
	return (
		<Center h="120px" w="120px" bgColor={bgColor || "brand.secondary"} rounded="xl">
			{children}
		</Center>
	)
}

export default ItemBox
