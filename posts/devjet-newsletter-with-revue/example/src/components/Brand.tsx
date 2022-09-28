import React from "react";
import { Link as ReactLink } from "react-router-dom";
import { ChakraProps, Image, useColorMode } from "@chakra-ui/react";

export function BrandFavicon(props: ChakraProps) {
  const { colorMode } = useColorMode();
  return (
    <ReactLink to={"/"}>
      <Image
        cursor="pointer"
        {...props}
        src={
          colorMode === "light"
            ? "/brand-favicon.svg"
            : "/brand-favicon-white.svg"
        }
        alt="devjet favicon"
      />
    </ReactLink>
  );
}

export function BrandLogo() {
  const { colorMode } = useColorMode();
  return (
    <ReactLink to={"/"}>
      <Image
        cursor="pointer"
        src={
          colorMode === "light" ? "/brand-logo.svg" : "/brand-logo-white.svg"
        }
        alt="devjet logo"
      />
    </ReactLink>
  );
}
