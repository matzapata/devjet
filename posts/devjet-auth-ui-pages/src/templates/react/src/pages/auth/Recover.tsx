import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Link,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { BrandFavicon } from "components/Brand";
import { Link as ReactLink } from "react-router-dom";

function Recover() {
  const { colorMode } = useColorMode();
  const [email, setEmail] = useState("");
  const [errorMessage] = useState("");
  const [loading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Center minH="100vh" py="10">
      <Container maxW="md">
        <BrandFavicon mx="auto" mb="4" />
        <Heading mb="4" textAlign="center">
          Forgot your password?
        </Heading>
        <Text
          mb="10"
          fontWeight="medium"
          color={colorMode === "light" ? "gray.600" : "gray.500"}
          textAlign="center"
        >
          No worries, we&apos;ll send you reset instructions.
        </Text>
        <Box as="form" w="full" onSubmit={onSubmit}>
          <FormControl isInvalid={errorMessage !== ""} mb="5">
            <Input
              type="email"
              name="email"
              bg={colorMode === "light" ? "white" : "gray.800"}
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
            <FormErrorMessage>{errorMessage}</FormErrorMessage>
          </FormControl>
          <Button
            isLoading={loading}
            type="submit"
            mt="8"
            size="md"
            colorScheme="blue"
            w="full"
          >
            Reset password
          </Button>
        </Box>
        <Box textAlign="center" mt="4">
          <Link
            as={ReactLink}
            to="/auth/signin"
            color={colorMode === "light" ? "gray.600" : "gray.500"}
            fontWeight="500"
            justifyItems="center"
          >
            <ArrowBackIcon mr="1" />
            Back to login
          </Link>
        </Box>
      </Container>
    </Center>
  );
}

export default Recover;
