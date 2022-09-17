import React from "react";
import { Box, Button, Container, Heading, Icon, Text } from "@chakra-ui/react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import NextLink from "next/link";

function ProCardC2A() {
  return (
    <Box py="12" mt="20" borderColor="gray.300" borderTop="1px" bg="white">
      <Container maxW="container.md">
        <Heading size="lg" mb="4">
          How to get access to this recipe - and everything on Devjet.
        </Heading>
        <Text fontSize="lg">
          Not everythig on devjet is free, like this one. Become a member and
          get unlimeted access to boost your projects productivity.
        </Text>
        <NextLink href="/pricing">
          <Button
            colorScheme="blue"
            mt="6"
            rightIcon={<Icon as={ArrowLongRightIcon} />}
          >
            Upgrade
          </Button>
        </NextLink>
      </Container>
    </Box>
  );
}

export default ProCardC2A;
