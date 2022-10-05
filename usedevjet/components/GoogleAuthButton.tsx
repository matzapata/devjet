import React from "react";
import { Button, useColorMode } from "@chakra-ui/react";
import { GoogleIcon } from "./GoogleIcon";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

function GoogleAuthButton() {
  const { colorMode } = useColorMode();
  return (
    <Button
      borderRadius="3px"
      onClick={() => supabaseClient.auth.signIn({ provider: "google" })}
      variant="outline"
      bg={colorMode === "light" ? "white" : "gray.800"}
      size="md"
      leftIcon={<GoogleIcon />}
    >
      Continue with Google
    </Button>
  );
}

export default GoogleAuthButton;
