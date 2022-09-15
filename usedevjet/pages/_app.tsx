import React from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../utils/chakraTheme";
import "../styles/global.css";
import { UserProvider } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { Provider } from "react-redux";
import { store } from "redux/store";
import ReduxApp from "components/ReduxApp";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <UserProvider supabaseClient={supabaseClient}>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <ReduxApp />
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </UserProvider>
  );
};

export default MyApp;
