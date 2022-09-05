import React from "react";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function LoginButton(props: any) {
  const router = useRouter();

  return (
    <Button onClick={() => router.push("/auth/login")} {...props}>
      Login
    </Button>
  );
}
