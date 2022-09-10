import { Box, Center, Link, Spacer, VStack } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import Head from "next/head";
import { ReactNode } from "react";
import Navbar from "./Navbar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { connected } = useWallet();

  return (
    <Box bg="background">
      <Head>
        <title>Shipoors</title>
        <meta name="description" content="NFT Collection for Shipoors" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        w="full"
        h="calc(100vh)"
        bgImage={connected ? "" : "url(/home-background.svg)"}
        bgPosition="center"
      >
        <VStack w="full" h="calc(100vh)" justify="center" as="footer">
          <Navbar />
          <Spacer />
          <Center>{children}</Center>

          <Spacer />

          <Center marginBottom={4} color="white">
            <Link href="https://twitter.com/AnishDe12020" isExternal>
              Built & Shipped by @AnishDe12020
            </Link>
          </Center>
        </VStack>
      </Box>
    </Box>
  );
};

export default MainLayout;
