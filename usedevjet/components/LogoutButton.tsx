import React from "react";
import { Button } from "@chakra-ui/react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

export default function LogoutButton(props: any) {
  return (
    <Button onClick={() => supabaseClient.auth.signOut()} {...props}>
      Logout
    </Button>
  );
}
