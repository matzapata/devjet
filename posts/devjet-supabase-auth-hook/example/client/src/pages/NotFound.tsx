import React from "react";
import { Center, Divider, Flex, Text } from "@chakra-ui/react";

function NotFound() {
  return (
    <Center minH="100vh" bg="gray.900">
      <Flex h="50px" alignItems="center">
        <Text color="white" fontSize="xl" fontWeight="medium">
          404
        </Text>
        <Divider orientation="vertical" mx="4" />
        <Text color="white">This page could not be found.</Text>
      </Flex>
    </Center>
  );
}

export default NotFound;
