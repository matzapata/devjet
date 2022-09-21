import React from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  Link,
  Text,
  useColorMode,
} from "@chakra-ui/react";

function Newsletter() {
  const { colorMode } = useColorMode();
  return (
    <Box
      p="6"
      bg={colorMode === "light" ? "blue.50" : "gray.800"}
      border="1px"
      borderColor={colorMode === "light" ? "blue.200" : "gray.400"}
      borderRadius={4}
    >
      <Heading size="md" mb="1">
        Subscribe to the newsletter
      </Heading>
      <Text mb="4">
        Get notified whenever a new recipe or generator is published
      </Text>
      <Box
        as={"form"}
        action="https://www.getrevue.co/profile/usedevjet/add_subscriber"
        method="post"
        id="revue-form"
        name="revue-form"
        target="_blank"
      >
        <HStack>
          <Input
            bg={colorMode === "light" ? "white" : "gray.900"}
            className="revue-form-field"
            placeholder="Your email address..."
            type="email"
            name="member[email]"
            id="member_email"
          />
          <Button
            colorScheme="blue"
            type="submit"
            value="Subscribe"
            name="member[subscribe]"
            id="member_submit"
          >
            Suscribe
          </Button>
        </HStack>

        <Text mt="2" fontSize="sm" color="gray.600">
          By subscribing, you agree with Revues{" "}
          <Link
            target="_blank"
            href="https://www.getrevue.co/terms"
            rel="noreferrer"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            target="_blank"
            href="https://www.getrevue.co/privacy"
            rel="noreferrer"
          >
            Privacy Policy
          </Link>
        </Text>
      </Box>
    </Box>
  );
}

export default Newsletter;
