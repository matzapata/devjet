import React, { useState } from "react";
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
  Link,
  Center,
  Box,
  Text,
  Flex,
} from "@chakra-ui/react";
import { BrandFavicon } from "../../components/Brand";
import NextLink from "next/link";

export default function Login() {
  const [state, setState] = useState({
    email: {
      value: "",
      error: "",
    },
    password: {
      value: "",
      error: "",
    },
    error: "",
  });

  const onChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Center minH="100vh">
      <Container maxW="md">
        <BrandFavicon mx="auto" mb="4" />
        <Heading mb="20" textAlign="center">
          Log in to your account
        </Heading>
        <Box
          as="form"
          w="full"
          onSubmit={(e: any) => {
            e.preventDefault();
          }}
        >
          <FormControl isInvalid={state.email.error !== ""} mb="5">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              bg="white"
              value={state.email.value}
              onChange={onChange}
            />
            <FormErrorMessage>{state.email.error}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={state.email.error !== ""}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              bg="white"
              value={state.password.value}
              onChange={onChange}
            />
            <FormErrorMessage>{state.password.error}</FormErrorMessage>
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
          <Button mt="8" size="md" colorScheme="blue" w="full">
            Sign In
          </Button>
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
