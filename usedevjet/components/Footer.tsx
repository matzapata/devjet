import React from "react";
import { Divider, Flex, Grid, Link, Text, VStack } from "@chakra-ui/react";
import { BrandFavicon } from "./Brand";
import NextLink from "next/link";

function Footer() {
  return (
    <VStack pt="4" pb="10">
      <Divider />
      <Flex w="full" py="4">
        <BrandFavicon h="6" mr="2" />
        <Text fontWeight="500" fontSize="sm">
          @2022 Devjet
        </Text>
      </Flex>
      <Grid templateColumns="repeat(3, 1fr)" gap="3" w="full">
        <NextLink href="/home" passHref>
          <Link py="2" color="gray.700">
            Explore
          </Link>
        </NextLink>
        <NextLink href="/home" passHref>
          <Link py="2" color="gray.700">
            Login
          </Link>
        </NextLink>
        <NextLink href="/home" passHref>
          <Link py="2" color="gray.700">
            Pricing
          </Link>
        </NextLink>
      </Grid>
    </VStack>
  );
}

export default Footer;
