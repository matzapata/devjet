import React from "react";
import { BrandLogo } from "./Brand";
import { Button, Flex, Hide, HStack } from "@chakra-ui/react";
import Link from "next/link";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useUser } from "@auth0/nextjs-auth0";

function NavBar() {
  const { user, isLoading } = useUser();

  return (
    <Flex my="8" justifyContent="space-between">
      <BrandLogo />
      <HStack spacing="4">
        <Hide below="md">
          <Link href="/">
            <Button variant="ghost">Explore</Button>
          </Link>
        </Hide>
        {user ? (
          <LogoutButton colorScheme="blue">Logout</LogoutButton>
        ) : (
          <LoginButton isLoading={isLoading} colorScheme="blue">
            Get started
          </LoginButton>
        )}
      </HStack>
    </Flex>
  );
}

export default NavBar;
