import React from "react";
import { BrandLogo } from "./Brand";
import { Button, Flex, Hide, HStack } from "@chakra-ui/react";
import Link from "next/link";

function NavBar() {
  return (
    <Flex my="8" justifyContent="space-between">
      <BrandLogo />
      <HStack spacing="4">
        <Hide below="md">
          <Link href="/">
            <Button variant="ghost">Explore</Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="ghost">Log in</Button>
          </Link>
        </Hide>
        <Link href="/auth/signup">
          <Button colorScheme="blue">Get started</Button>
        </Link>
      </HStack>
    </Flex>
  );
}

export default NavBar;
