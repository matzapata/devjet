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
} from "@chakra-ui/react";
import { BrandFavicon } from "../../components/Brand";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

type State = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

export default function SignUp() {
  const router = useRouter();
  const { user } = useUser();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayEmailAlert, setDisplayEmailAlert] = useState(false);
  const [state, setState] = useState<State>({
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [errors] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
  });

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
    setError("");
    const { error } = await supabaseClient.auth.signUp({
      email: state.email,
      password: state.password,
    });
    if (error) setError(error.message);
    else setDisplayEmailAlert(true);
    setState({
      email: "",
      password: "",
      passwordConfirmation: "",
    });
    setLoading(false);
  };

  return (
    <Center minH="100vh" py="10">
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
          <FormControl isInvalid={errors.password !== ""} mb="5">
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
          <FormControl isInvalid={errors.passwordConfirmation !== ""}>
            <FormLabel>Confirm password</FormLabel>
            <Input
              type="password"
              name="passwordConfirmation"
              bg="white"
              required
              value={state.passwordConfirmation}
              onChange={onChange}
            />
            <FormErrorMessage>{errors.passwordConfirmation}</FormErrorMessage>
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
          <Text color="red.500" mt="2" fontWeight="500">
            {error}
          </Text>
        </Box>
        <Flex justifyContent="center" mt="6">
          <Text as="span" fontWeight="500" mr="1" color="gray.600">
            Already have an account?
          </Text>
          <NextLink href="/auth/signin" passHref>
            <Link color="blue.600" fontWeight="500">
              Sign in
            </Link>
          </NextLink>
        </Flex>
      </Container>
    </Center>
  );
}
