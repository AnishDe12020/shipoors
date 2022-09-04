import {
  Container,
  Heading,
  VStack,
  Text,
  HStack,
  Button,
  Image,
} from "@chakra-ui/react";

const Connected = () => {
  return (
    <Container>
      <VStack spacing={24}>
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
          <Text color="bodyText" fontSize="xl" textAlign="center">
            Each shipoor is randomy generated and can be staked to receive{" "}
            <b> $BLD</b>. Use your <b> $BLD</b> to upgrade your shipoor and
            receive perks within the community!
          </Text>
        </VStack>
        <HStack spacing={12}>
          <Image src="avator1.png" alt="" />
          <Image src="avator2.png" alt="" />
          <Image src="avator3.png" alt="" />
          <Image src="avator4.png" alt="" />
          <Image src="avator5.png" alt="" />
        </HStack>

        <Button bgColor="accent" color="white" maxW="300px">
          mint shipoor
        </Button>
      </VStack>
    </Container>
  );
};

export default Connected;
