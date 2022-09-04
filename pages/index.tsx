import { Box, Center, Link, Spacer, VStack } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import type { NextPage } from "next";
import Head from "next/head";
import Connected from "../components/Connected";
import Disconnected from "../components/Disconnected";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
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
        // TODO make a bg
        // bgImage={"url(/home-background.svg)"}
        // bgPosition="center"
      >
        <VStack w="full" h="calc(100vh)" justify="center" as="footer">
          <Navbar />
          <Spacer />

          <Center>{connected ? <Connected /> : <Disconnected />}</Center>

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

export default Home;
