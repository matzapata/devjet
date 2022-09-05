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
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { BrandFavicon } from "../../components/Brand";
import NextLink from "next/link";

function Recover() {
  const [state, setState] = useState({
    value: "",
    error: "",
  });

  const onChange = (e: any) => {
    setState({
      ...state,
      value: e.target.value,
    });
  };

  return (
    <Center minH="100vh" py="10">
      <Container maxW="md">
        <BrandFavicon mx="auto" mb="4" />
        <Heading mb="4" textAlign="center">
          Forgot your password?
        </Heading>
        <Text mb="10" fontWeight="medium" color="gray.700" textAlign="center">
          No worries, we&apos;ll send you reset instructions.
        </Text>
        <Box
          as="form"
          w="full"
          onSubmit={(e: any) => {
            e.preventDefault();
          }}
        >
          <FormControl isInvalid={state.error !== ""} mb="5">
            <Input
              type="email"
              name="email"
              bg="white"
              required
              placeholder="Enter your email"
              value={state.value}
              onChange={onChange}
            />
            <FormErrorMessage>{state.error}</FormErrorMessage>
          </FormControl>
          <Button type="submit" mt="8" size="md" colorScheme="blue" w="full">
            Reset password
          </Button>
        </Box>
        <Box textAlign="center" mt="4">
          <NextLink href="/auth/login" passHref>
            <Link color="gray.600" fontWeight="500" justifyItems="center">
              <ArrowBackIcon mr="1" />
              Back to login
            </Link>
          </NextLink>
        </Box>
      </Container>
    </Center>
  );
}

export default Recover;
