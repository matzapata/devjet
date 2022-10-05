import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  Heading,
  Text,
  Container,
  Flex,
  useColorMode,
  Input,
  Button,
  Link,
  VStack,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

import NavBar from "components/NavBar";
import Footer from "components/Footer";
import { useUser } from "@supabase/auth-helpers-react";
import Confetti from "react-confetti";
import useWindowDimensions from "lib/useWindowDimensions";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";

export default function License() {
  const { user } = useUser();
  const [licenseKey, setLicenseKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { width, height } = useWindowDimensions();
  const { colorMode } = useColorMode();
  const router = useRouter();

  useEffect(() => {
    if (user?.user_metadata.plan === "lifetime") router.push("/");
  }, [user, router]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (!user) {
      alert(
        "Remember that your licese will be linked to your account! you have to be logged in!"
      );
      router.push("/auth/signin");
    } else {
      try {
        setLoading(true);
        await axios.post("/api/license/activate/all-access", {
          license_key: licenseKey,
        });
        setSuccess(true);
        supabaseClient.auth.signOut();
      } catch (e: any) {
        console.log(e);
        setSuccess(false);
        if (!e.response.data.success) {
          alert(`Error: ${e.response.data.message}`);
        } else {
          alert(`Error: ${e.message}`);
        }
      } finally {
        setLoading(false);
        setLicenseKey("");
      }
    }
  };

  return (
    <>
      <Head>
        <title>Devjet</title>
      </Head>
      {success && <Confetti height={height} width={width} recycle={true} />}

      <NavBar />

      <Container w="full" maxW="container.md">
        <Text
          mt="16"
          mb="2"
          fontWeight="medium"
          fontSize="lg"
          color={colorMode === "light" ? "gray.600" : "gray.300"}
          textAlign="center"
          fontFamily="Fira code"
        >
          all-access
        </Text>
        <Heading
          textAlign="center"
          letterSpacing="tight"
          mb="8"
          as="h1"
          size="2xl"
          fontFamily="Fira code"
        >
          Get unlimited access to everything on devjet
        </Heading>

        <form onSubmit={onSubmit}>
          <Flex justifyContent="center">
            <VStack mt="8" w="full" maxW="lg" spacing="2">
              {success && (
                <Alert
                  status="success"
                  mb="5"
                  fontSize="sm"
                  fontWeight="medium"
                >
                  <AlertIcon h="4" />
                  Successfully activated! Please sign in to get full access
                </Alert>
              )}
              <Input
                required
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                type="text"
                placeholder="Enter your license key..."
              />
              <Button
                isLoading={loading}
                w="full"
                type="submit"
                borderRadius="3px"
              >
                Activate
              </Button>
              <NextLink
                href="https://usedevjet.gumroad.com/l/full-access"
                passHref
              >
                <Link
                  color="blue.300"
                  fontWeight="500"
                  fontSize="md"
                  textAlign="center"
                >
                  I don&apos;t have a license key yet
                </Link>
              </NextLink>
            </VStack>
          </Flex>
        </form>
      </Container>
      <Footer />
    </>
  );
}
