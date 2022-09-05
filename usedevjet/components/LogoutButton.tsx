import React from "react";
import { Button } from "@chakra-ui/react";
import { useAuth } from "utils/auth";

export default function LogoutButton(props: any) {
  const { signOut } = useAuth();
  return (
    <Button onClick={() => signOut()} {...props}>
      Logout
    </Button>
  );
}
