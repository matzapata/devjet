import React from "react";
import { Center, Image, Link, Text, VStack } from "@chakra-ui/react";

function Home() {
  return (
    <Center bg="gray.900" minH="100vh">
      <VStack spacing="5">
        <Image src="/logo.svg" h="14" mb="6" />
        <Text color="white" fontSize="lg">
          Edit <code>src/pages/Home.tsx</code> and save to reload.
        </Text>
        <Link
          fontSize="lg"
          color="blue.400"
          textDecoration="underline"
          fontWeight="medium"
          href="https://usedevjet.com"
        >
          Devjet quickstart
        </Link>
      </VStack>
    </Center>
  );
}

export default Home;
