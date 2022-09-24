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
import { BrandFavicon } from "components/Brand";
import { useNavigate, Link as ReactLink } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
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

  // useEffect(() => {
  //   if (user && user.user_metadata.plan !== "lifetime") router.push("/plans");
  //   else if (user) router.push("/");
  // }, [user, router]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Center minH="100vh" py="14">
      <Container maxW="md">
        <BrandFavicon mx="auto" mb="4" />
        <Heading mb="20" textAlign="center">
          Log in to your account
        </Heading>
        {/* {router.query.recover && (
          <Alert status="success" mb="5" fontSize="sm" fontWeight="medium">
            <AlertIcon h="4" />
            Recovery email sent successfully
          </Alert>
        )} */}
        <Box as="form" w="full" onSubmit={onSubmit}>
          <FormControl isInvalid={errors.email !== ""} mb="2">
            <FormLabel>Email</FormLabel>
            <Input
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
              type="password"
              name="password"
              bg={colorMode === "light" ? "white" : "gray.800"}
              required
              value={state.password}
              onChange={onChange}
            />
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>
          <ReactLink to="/auth/recover">
            <Link
              color="blue.600"
              fontWeight="medium"
              display="block"
              textAlign="right"
              mt="1"
            >
              Forgot your password?
            </Link>
          </ReactLink>
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
          <ReactLink to="/auth/signup">
            <Link color="blue.600" fontWeight="500">
              Sign up
            </Link>
          </ReactLink>
        </Flex>
      </Container>
    </Center>
  );
}
