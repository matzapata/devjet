import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  FormControl,
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
  useColorMode,
  FormErrorMessage,
} from "@chakra-ui/react";
import { BrandFavicon } from "components/Brand";
import NextLink from "next/link";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

type State = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

export default function SignUp(): JSX.Element {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayEmailAlert, setDisplayEmailAlert] = useState(false);
  const { colorMode } = useColorMode();
  const [state, setState] = useState<State>({
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
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
    setErrorMessage("");
    const { error } = await supabaseClient.auth.signUp({
      email: state.email,
      password: state.password,
    });
    if (error) setErrorMessage(error.message);
    else setDisplayEmailAlert(true);
    setState({
      email: "",
      password: "",
      passwordConfirmation: "",
    });
    setLoading(false);
  };

  return (
    <Center minH="100vh" py="14">
      <Container maxW="md">
        <BrandFavicon mx="auto" mb="4" />
        <Heading mb="20" textAlign="center">
          Create your account
        </Heading>
        {displayEmailAlert && (
          <Alert status="success" mb="5" fontSize="sm" fontWeight="medium">
            <AlertIcon h="4" />
            Account created successfully. Please check your email.
          </Alert>
        )}
        {errorMessage !== "" && (
          <Alert status="error" mb="5" fontSize="sm" fontWeight="medium">
            <AlertIcon h="4" />
            {errorMessage}
          </Alert>
        )}
        <Box as="form" w="full" onSubmit={onSubmit}>
          <FormControl mb="2">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              bg={colorMode === "light" ? "white" : "gray.800"}
              required
              value={state.email}
              onChange={onChange}
            />
          </FormControl>
          <FormControl mb="2">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              bg={colorMode === "light" ? "white" : "gray.800"}
              required
              value={state.password}
              onChange={onChange}
            />
          </FormControl>
          <FormControl
            isInvalid={state.password !== state.passwordConfirmation}
          >
            <FormLabel>Confirm password</FormLabel>
            <Input
              type="password"
              name="passwordConfirmation"
              bg={colorMode === "light" ? "white" : "gray.800"}
              required
              value={state.passwordConfirmation}
              onChange={onChange}
            />
            <FormErrorMessage>Passwords doesn&apos;t match</FormErrorMessage>
          </FormControl>
          <Button
            isLoading={loading}
            type="submit"
            mt="8"
            size="md"
            colorScheme="blue"
            w="full"
          >
            Sign up
          </Button>
        </Box>
        <Flex justifyContent="center" mt="4">
          <Text
            mr="1"
            as="span"
            fontWeight="500"
            color={colorMode === "light" ? "gray.600" : "gray.500"}
          >
            Already have an account?
          </Text>
          <Link
            as={NextLink}
            href="/auth/signin"
            color="blue.600"
            fontWeight="500"
          >
            Sign in
          </Link>
        </Flex>
      </Container>
    </Center>
  );
}
