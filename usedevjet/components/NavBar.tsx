import React from "react";
import { BrandLogo } from "./Brand";
import { Button, Flex, HStack } from "@chakra-ui/react";

function NavBar() {
  return (
    <Flex my="8" justifyContent="space-between">
      <BrandLogo />
      <HStack spacing="4">
        <Button variant="ghost">Explore</Button>
        <Button variant="ghost">Log in</Button>
        <Button colorScheme="blue">Get started</Button>
      </HStack>
    </Flex>
  );
}

export default NavBar;
