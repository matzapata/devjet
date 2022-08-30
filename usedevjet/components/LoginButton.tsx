import React from "react";
import { Button } from "@chakra-ui/react";

export default function LoginButton(props: any) {
  return (
    <Button as={"a"} href="/api/auth/login" {...props}>
      {props.children}
    </Button>
  );
}
