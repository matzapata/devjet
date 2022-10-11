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
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import { BrandFavicon } from "components/Brand";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { useAuth } from "hooks/authHook";

export default function Login() {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const { signIn, user, loading, errorMessage } = useAuth();

  const [state, setState] = useState({
    email: "",
    password: "",
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
    const error = await signIn({
      email: state.email,
      password: state.password,
    });
    if (!error) navigate("/");
  };

  return (
    <Center minH="100vh" py="14">
      <Container maxW="md">
        <BrandFavicon mx="auto" mb="4" />
        <Heading mb="20" textAlign="center">
          Log in to your account
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
          <FormControl>
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
          <Link
            as={ReactLink}
            to="/auth/recover"
            color="blue.600"
            fontWeight="medium"
            display="block"
            textAlign="right"
            mt="1"
          >
            Forgot your password?
          </Link>
          <Stack spacing="4">
            <Button
              type="submit"
              mt="8"
              size="md"
              colorScheme="blue"
              w="full"
              isLoading={loading}
            >
              Sign In
            </Button>
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
          <Link
            as={ReactLink}
            to="/auth/signup"
            color="blue.600"
            fontWeight="500"
          >
            Sign up
          </Link>
        </Flex>
      </Container>
    </Center>
  );
}