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
    <Container>
      <VStack>
        <BrandFavicon />
        <Heading>Sign in to your account</Heading>
        <VStack
          as="form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <FormControl isInvalid={state.email.error !== ""}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
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
              value={state.password.value}
              onChange={onChange}
            />
            <FormErrorMessage>{state.password.error}</FormErrorMessage>
          </FormControl>
          <Link as={NextLink} href="/auth/recover" passHref>
            Forgot your password?
          </Link>
          <Button colorScheme="blue">Sign In</Button>
        </VStack>
      </VStack>
    </Container>
  );
}
