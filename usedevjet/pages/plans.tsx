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
  Flex,
} from "@chakra-ui/react";

import NavBar from "components/NavBar";
import Footer from "components/Footer";
import { CheckIcon } from "@heroicons/react/24/outline";
import LifetimePlanCard from "components/LifetimePlanCard";
import QuarterlyPlanCard from "components/QuarterlyPlanCard";
import { useUser } from "@supabase/auth-helpers-react";

export default function Pricing() {
  const { user } = useUser();

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
          <Stack mt="8" direction={{ base: "column", sm: "row" }} spacing={4}>
            <QuarterlyPlanCard currentPlan={user?.user_metadata.plan} />
            <LifetimePlanCard currentPlan={user?.user_metadata.plan} />
          </Stack>
        </Flex>

        <Footer />
      </Container>
    </>
  );
}
