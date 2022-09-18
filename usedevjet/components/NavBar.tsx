import React from "react";
import { BrandLogo } from "./Brand";
import { Button, Flex, Hide, HStack } from "@chakra-ui/react";
import Link from "next/link";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useUser } from "@supabase/auth-helpers-react";

function NavBar() {
  const { user } = useUser();

  return (
    <Flex my="8" justifyContent="space-between">
      <BrandLogo />
      <HStack spacing="4">
        <Hide below="sm">
          <Link href="/">
            <Button variant="ghost">Explore</Button>
          </Link>
          <Link href="/plans">
            <Button variant="ghost">Plans</Button>
          </Link>
        </Hide>
        {user ? (
          <LogoutButton colorScheme="blue" />
        ) : (
          <LoginButton colorScheme="blue" />
        )}
      </HStack>
    </Flex>
  );
}

export default NavBar;
