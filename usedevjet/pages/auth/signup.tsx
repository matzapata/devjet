import React, { useState } from "react";
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

export default function SignUp() {
  const [state, setState] = useState({
    fullName: {
      value: "",
      error: "",
    },
    email: {
      value: "",
      error: "",
    },
    password: {
      value: "",
      error: "",
    },
    passwordConfirmation: {
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
    <Center minH="100vh" py="10">
      <Container maxW="md">
        <BrandFavicon mx="auto" mb="4" />
        <Heading mb="20" textAlign="center">
          Create your account
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
          <FormControl isInvalid={state.email.error !== ""} mb="5">
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
          <FormControl isInvalid={state.passwordConfirmation.error !== ""}>
            <FormLabel>Confirm password</FormLabel>
            <Input
              type="password"
              name="passwordConfirmation"
              bg="white"
              value={state.password.value}
              onChange={onChange}
            />
            <FormErrorMessage>
              {state.passwordConfirmation.error}
            </FormErrorMessage>
          </FormControl>
          <Button type="submit" mt="8" size="md" colorScheme="blue" w="full">
            Sign up
          </Button>
        </Box>
        <Flex justifyContent="center" mt="6">
          <Text as="span" fontWeight="500" mr="1" color="gray.600">
            Already have an account?
          </Text>
          <NextLink href="/auth/login" passHref>
            <Link color="blue.600" fontWeight="500">
              Sign in
            </Link>
          </NextLink>
        </Flex>
      </Container>
    </Center>
  );
}
