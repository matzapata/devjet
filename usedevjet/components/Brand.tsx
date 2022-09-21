import React from "react";
import Link from "next/link";
import { ChakraProps, Image, useColorMode } from "@chakra-ui/react";

export function BrandFavicon(props: ChakraProps) {
  const { colorMode } = useColorMode();
  return (
    <Link href={"/"}>
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
    </Link>
  );
}

export function BrandLogo() {
  const { colorMode } = useColorMode();
  return (
    <Link href={"/"}>
      <Image
        cursor="pointer"
        src={
          colorMode === "light" ? "/brand-logo.svg" : "/brand-logo-white.svg"
        }
        alt="devjet logo"
      />
    </Link>
  );
}
