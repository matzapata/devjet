import React, { useEffect, useState } from "react";
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
  Center,
  Spinner,
  Alert,
  AlertIcon,
  useColorMode,
} from "@chakra-ui/react";

import NavBar from "components/NavBar";
import Footer from "components/Footer";
import { CheckIcon } from "@heroicons/react/24/outline";
import LifetimePlanCard from "components/LifetimePlanCard";
import QuarterlyPlanCard from "components/QuarterlyPlanCard";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import axios from "axios";
import Confetti from "react-confetti";
import useWindowDimensions from "lib/useWindowDimensions";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

export default function Pricing() {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successPlan, setSuccessPlan] = useState("");
  const { width, height } = useWindowDimensions();
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (router.query.payment_id !== undefined) {
      setLoading(true);
      axios
        .post(`/api/plans/validate/${router.query.payment_id}`)
        .then((res) => {
          if (res.data.status === "approved") {
            supabaseClient.auth.signOut();
            setSuccessPlan(res.data.plan);
            setLoading(false);
            setSuccess(true);
          }
        });
    } else setLoading(false);
  }, [router.query]);

  return (
    <>
      <Head>
        <title>Devjet</title>
      </Head>
      {loading && (
        <Center minH="100vh">
          <Spinner />
        </Center>
      )}
      {success && <Confetti height={height} width={width} recycle={true} />}
      {!loading && (
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

          {success && (
            <Alert status="success" maxW="md" mx="auto" mt="10">
              <AlertIcon />
              <Text fontWeight="medium">
                Yayyy!! Plan confirmed! Please login again to access content.
              </Text>
            </Alert>
          )}

          <Flex justifyContent="center">
            <Stack mt="8" direction={{ base: "column", sm: "row" }} spacing={4}>
              <QuarterlyPlanCard
                currentPlan={success ? successPlan : user?.user_metadata.plan}
              />
              <LifetimePlanCard
                currentPlan={success ? successPlan : user?.user_metadata.plan}
              />
            </Stack>
          </Flex>

          <Footer />
        </Container>
      )}
    </>
  );
}
