import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Center, Image, Link, Text, VStack } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <Center bg="gray.900" minH="100vh">
      <Head>
        <title>devjet</title>
      </Head>
      <VStack spacing="5">
        <Image alt="devjet logo" src="/devjet.svg" h="14" mb="6" />
        <Text color="white" fontSize="lg">
          Edit <code>pages/index.tsx</code> and save to reload.
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
};

export default Home;
