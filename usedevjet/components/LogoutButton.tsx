import React from "react";
import { Button } from "@chakra-ui/react";

export default function LogoutButton(props: any) {
  return (
    <Button as={"a"} href="/api/auth/logout" {...props}>
      {props.children}
    </Button>
  );
}
