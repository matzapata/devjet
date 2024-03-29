import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Center,
  Box,
  Text,
  Flex,
  Alert,
  AlertIcon,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import { BrandFavicon } from "../../components/Brand";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import GoogleAuthButton from "components/GoogleAuthButton";
import Head from "next/head";

export default function Login() {
  const router = useRouter();
  const { user } = useUser();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { colorMode } = useColorMode();

  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [errors] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user && user.user_metadata.plan !== "lifetime") router.push("/plans");
    else if (user) router.push("/");
  }, [user, router]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabaseClient.auth.signIn({
      email: state.email,
      password: state.password,
    });
    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Center minH="100vh" py="14">
        <Container maxW="md">
          <BrandFavicon mx="auto" mb="4" />
          <Heading mb="20" textAlign="center">
            Log in to your account
          </Heading>
          {router.query.recover && (
            <Alert status="success" mb="5" fontSize="sm" fontWeight="medium">
              <AlertIcon h="4" />
              Recovery email sent successfully
            </Alert>
          )}
          <Box as="form" w="full" onSubmit={onSubmit}>
            <FormControl isInvalid={errors.email !== ""} mb="2">
              <FormLabel>Email</FormLabel>
              <Input
                borderRadius="3px"
                type="email"
                name="email"
                bg={colorMode === "light" ? "white" : "gray.800"}
                required
                value={state.email}
                onChange={onChange}
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password !== ""}>
              <FormLabel>Password</FormLabel>
              <Input
                borderRadius="3px"
                type="password"
                name="password"
                bg={colorMode === "light" ? "white" : "gray.800"}
                required
                value={state.password}
                onChange={onChange}
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
            <NextLink href="/auth/recover" passHref>
              <Link
                color="blue.600"
                fontWeight="medium"
                display="block"
                textAlign="right"
                mt="1"
              >
                Forgot your password?
              </Link>
            </NextLink>
            <Stack spacing="4">
              <Button
                type="submit"
                mt="8"
                size="md"
                colorScheme="blue"
                w="full"
                isLoading={loading}
                borderRadius="3px"
              >
                Sign In
              </Button>
              <GoogleAuthButton />
              {error !== "" && (
                <Text color="red.500" mt="2" fontWeight="500">
                  {error}
                </Text>
              )}
            </Stack>
          </Box>
          <Flex justifyContent="center" mt="4">
            <Text
              as="span"
              fontWeight="500"
              mr="1"
              color={colorMode === "light" ? "gray.600" : "gray.500"}
            >
              Don&apos;t have an account?
            </Text>
            <NextLink href="/auth/signup" passHref>
              <Link color="blue.600" fontWeight="500">
                Sign up
              </Link>
            </NextLink>
          </Flex>
        </Container>
      </Center>
    </>
  );
}
