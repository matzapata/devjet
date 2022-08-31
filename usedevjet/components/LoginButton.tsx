import React from "react";
import { Button, ChakraProps } from "@chakra-ui/react";

export default function LoginButton({
  children,
  ...props
}: {
  children: JSX.Element;
  props: ChakraProps;
}) {
  return (
    <Button as={"a"} href="/api/auth/login" {...props}>
      {children}
    </Button>
  );
}
