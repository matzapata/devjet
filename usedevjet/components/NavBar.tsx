import React from "react";
import { BrandLogo } from "./Brand";
import { Button, Container, Flex, HStack } from "@chakra-ui/react";
import Link from "next/link";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useUser } from "@supabase/auth-helpers-react";

function NavBar() {
  const { user } = useUser();

  return (
    <Container maxW="container.lg">
      <Flex py="3" justifyContent="space-between">
        <BrandLogo />
        <HStack spacing="2">
          <Link href="/validate">
            <Button variant="ghost">Activate</Button>
          </Link>
          {user ? (
            <LogoutButton
              borderRadius="3px"
              colorScheme="blue"
              bgColor="blue.600"
            />
          ) : (
            <LoginButton borderRadius="3px" colorScheme="blue" />
          )}
        </HStack>
      </Flex>
    </Container>
  );
}

export default NavBar;
