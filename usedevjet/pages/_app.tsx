import React from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../utils/chakraTheme";
import "../styles/global.css";
import { AuthProvider } from "utils/auth";
import { supabase } from "utils/supabase";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider supabase={supabase}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
};

export default MyApp;
