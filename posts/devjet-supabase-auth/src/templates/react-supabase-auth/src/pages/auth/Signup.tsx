import React, { useState, useEffect } from "react";
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
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { useAuth } from "hooks/authHook";

type State = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

export default function SignUp() {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const { signUp, user, loading, errorMessage } = useAuth();
  const [state, setState] = useState<State>({
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = await signUp({
      email: state.email,
      password: state.password,
    });
    if (!error) navigate("/auth/signin");
  };

  return (
    <Center minH="100vh" py="14">
      <Container maxW="md">
        <BrandFavicon mx="auto" mb="4" />
        <Heading mb="20" textAlign="center">
          Create your account
        </Heading>

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
            as={ReactLink}
            to="/auth/signin"
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