import React from "react";
import Head from "next/head";
import {
  Heading,
  Text,
  Container,
  Flex,
  Center,
  Spinner,
  useColorMode,
  Link,
  VStack,
} from "@chakra-ui/react";

import NavBar from "components/NavBar";
import Footer from "components/Footer";

import LifetimePlanCard from "components/LifetimePlanCard";
import { useUser } from "@supabase/auth-helpers-react";
import NextLink from "next/link";

export default function Pricing() {
  const { user, isLoading } = useUser();
  const { colorMode } = useColorMode();

  return (
    <>
      <Head>
        <title>Devjet</title>
      </Head>
      {isLoading && (
        <Center minH="100vh">
          <Spinner />
        </Center>
      )}
      {!isLoading && (
        <Container w="full" maxW="container.md">
          <NavBar />

          <Text
            mt="16"
            mb="2"
            fontWeight="medium"
            fontSize="lg"
            color={colorMode === "light" ? "gray.600" : "gray.300"}
            textAlign="center"
          >
            all-access
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

          <Flex justifyContent="center">
            <VStack mt="8" direction="column" spacing="4" w="full">
              <LifetimePlanCard
                isPro={user?.user_metadata.plan === "lifetime"}
              />
              <NextLink
                href={
                  user?.user_metadata.plan === "lifetime" ? "#" : "/license"
                }
                passHref
              >
                <Link
                  color="blue.300"
                  fontWeight="500"
                  fontSize="md"
                  textAlign="center"
                >
                  I already have a license key
                </Link>
              </NextLink>
            </VStack>
          </Flex>

          <Footer />
        </Container>
      )}
    </>
  );
}
