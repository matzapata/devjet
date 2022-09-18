import React from "react";
import Head from "next/head";
import {
  Heading,
  Text,
  Container,
  List,
  ListItem,
  ListIcon,
  Stack,
  Box,
  Button,
  Flex,
} from "@chakra-ui/react";

import NavBar from "components/NavBar";
import Footer from "components/Footer";
import { CheckIcon } from "@heroicons/react/24/outline";

export default function Pricing() {
  return (
    <>
      <Head>
        <title>Devjet</title>
      </Head>
      <Container w="full" maxW="container.md">
        <NavBar />
        <Text
          mt="16"
          mb="2"
          fontWeight="medium"
          fontSize="lg"
          color="gray.600"
          textAlign="center"
        >
          All-access
        </Text>
        <Heading
          textAlign="center"
          letterSpacing="tight"
          mb="8"
          as="h1"
          size="2xl"
        >
          Get unlimited access to everything on devjet
        </Heading>
        <List spacing="1" display="flex" flexDir="column" alignItems="center">
          <ListItem>
            <ListIcon as={CheckIcon} color="green.600" />
            All PERN code receipes and generators
          </ListItem>
          <ListItem>
            <ListIcon as={CheckIcon} color="green.600" />
            All Nextjs code receipes and generators
          </ListItem>
          <ListItem>
            <ListIcon as={CheckIcon} color="green.600" />
            Free updates
          </ListItem>
        </List>

        <Flex justifyContent="center">
          <Stack mt="8" direction={{ base: "column", md: "row" }}>
            <Box
              p="6"
              border="1px"
              borderColor="gray.200"
              maxW="300px"
              borderRadius="4"
              textAlign="center"
              _hover={{ borderColor: "blue.500", borderWidth: "2px" }}
            >
              <Heading size="lg" mb="2">
                $1500
              </Heading>
              <Heading size="sm" mb="4">
                3 Months access
              </Heading>
              <Text mb="6">
                Give your project a boost. <br /> Pay once and access all
                content for 3 months
              </Text>
              <Button colorScheme="blue" w="full">
                Select
              </Button>
            </Box>
            <Box
              p="6"
              border="2px"
              borderColor="blue.500"
              maxW="300px"
              borderRadius="4"
              textAlign="center"
              _hover={{ borderColor: "blue.500", borderWidth: "4px" }}
            >
              <Heading size="lg" mb="2">
                $2000
              </Heading>
              <Heading size="sm" mb="4">
                Lifetime access!!
              </Heading>
              <Text mb="6">
                Give your career a boost. <br /> Pay once and access all content
                forever
              </Text>
              <Button colorScheme="blue" w="full">
                Select
              </Button>
            </Box>
          </Stack>
        </Flex>

        <Footer />
      </Container>
    </>
  );
}
