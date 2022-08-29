import React from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "@auth0/nextjs-auth0";
import theme from "../utils/chakraTheme";
import "../styles/global.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <UserProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </UserProvider>
  );
};

export default MyApp;
