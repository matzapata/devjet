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
import { supabase } from "utils/supabase";
import { useRouter } from "next/router";

type State = {
  email: string;
  password: string;
  passwordConfirmation: string;
  errors: {
    email: string;
    password: string;
    passwordConfirmation: string;
  };
  error: string;
};

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<State>({
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    error: "",
  });

  const onChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: state.email,
      password: state.password,
    });
    if (error) setState({ ...state, error: error.message });
    else router.push("/auth/login");
    setLoading(false);
  };

  return (
    <Center minH="100vh" py="10">
      <Container maxW="md">
        <BrandFavicon mx="auto" mb="4" />
        <Heading mb="20" textAlign="center">
          Create your account
        </Heading>
        <Box as="form" w="full" onSubmit={onSubmit}>
          <FormControl isInvalid={state.errors.email !== ""} mb="5">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              bg="white"
              required
              value={state.email}
              onChange={onChange}
            />
            <FormErrorMessage>{state.errors.email}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={state.errors.password !== ""} mb="5">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              bg="white"
              required
              value={state.password}
              onChange={onChange}
            />
            <FormErrorMessage>{state.errors.password}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={state.errors.passwordConfirmation !== ""}>
            <FormLabel>Confirm password</FormLabel>
            <Input
              type="password"
              name="passwordConfirmation"
              bg="white"
              required
              value={state.passwordConfirmation}
              onChange={onChange}
            />
            <FormErrorMessage>
              {state.errors.passwordConfirmation}
            </FormErrorMessage>
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
