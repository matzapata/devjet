import React from "react";
import { ChakraProps, Image, useColorMode } from "@chakra-ui/react";
import NextLink from "next/link";

export function BrandFavicon(props: ChakraProps) {
  const { colorMode } = useColorMode();
  return (
    <NextLink href={"/"}>
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
    </NextLink>
  );
}

export function BrandLogo() {
  const { colorMode } = useColorMode();
  return (
    <NextLink href={"/"}>
      <Image
        cursor="pointer"
        src={
          colorMode === "light" ? "/brand-logo.svg" : "/brand-logo-white.svg"
        }
        alt="devjet logo"
      />
    </NextLink>
  );
}
