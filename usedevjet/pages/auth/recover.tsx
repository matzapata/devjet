import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

function Recover() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabaseClient.auth.api.resetPasswordForEmail(
      email
    );
    if (error) setError(error.message);
    setLoading(false);
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
        <Box as="form" w="full" onSubmit={onSubmit}>
          <FormControl isInvalid={error !== ""} mb="5">
            <Input
              type="email"
              name="email"
              bg="white"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
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
          <NextLink href="/auth/signin" passHref>
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
