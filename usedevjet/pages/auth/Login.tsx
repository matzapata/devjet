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
} from "@chakra-ui/react";
import { BrandFavicon } from "../../components/Brand";
import NextLink from "next/link";
import { useAuth } from "utils/auth";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const { user, loading, error, signIn } = useAuth();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    signIn(state.email, state.password);
  };

  return (
    <Center minH="100vh" py="10">
      <Container maxW="md">
        <BrandFavicon mx="auto" mb="4" />
        <Heading mb="20" textAlign="center">
          Log in to your account
        </Heading>
        <Box as="form" w="full" onSubmit={onSubmit}>
          <FormControl isInvalid={errors.email !== ""} mb="5">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              bg="white"
              required
              value={state.email}
              onChange={onChange}
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password !== ""}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              bg="white"
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
          <Text color="red.500" mt="2" fontWeight="500">
            {error}
          </Text>
        </Box>
        <Flex justifyContent="center" mt="6">
          <Text as="span" fontWeight="500" mr="1" color="gray.600">
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
  );
}
