import React from "react";
import Link from "next/link";
import { Image } from "@chakra-ui/react";

export function BrandFavicon() {
  return (
    <Link href={"/"}>
      <Image cursor="pointer" src="/brand-favicon.svg" alt="devjet favicon" />
    </Link>
  );
}

export function BrandLogo() {
  return (
    <Link href={"/"}>
      <Image cursor="pointer" src="/brand-logo.svg" alt="devjet logo" />
    </Link>
  );
}

export function BrandLogoWhite() {
  return (
    <Link href={"/"}>
      <Image cursor="pointer" src="/brand-logo-white.svg" alt="devjet logo" />
    </Link>
  );
}
