import { HStack } from "@chakra-ui/react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const Navbar = () => {
  return (
    <HStack as="nav" w="full" justify="end" p={8}>
      <WalletMultiButton className="wallet-adapter-button-trigger" />
    </HStack>
  );
};

export default Navbar;
