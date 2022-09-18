import React from "react";
import { Button } from "@chakra-ui/react";
import { GoogleIcon } from "./GoogleIcon";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

function GoogleAuthButton() {
  return (
    <Button
      onClick={() => supabaseClient.auth.signIn({ provider: "google" })}
      variant="outline"
      bg="white"
      size="md"
      leftIcon={<GoogleIcon />}
    >
      Continue with Google
    </Button>
  );
}

export default GoogleAuthButton;
