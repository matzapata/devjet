import React from "react";
import { Divider, Flex, Text, VStack, Icon } from "@chakra-ui/react";
import { BrandFavicon } from "./Brand";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <VStack pt="20" pb="10">
      <Divider />
      <Flex justifyContent="space-between" alignItems="center" w="100%">
        <Flex w="full" py="4">
          <BrandFavicon h="5" mr="2" />
          <Text fontWeight="500" fontSize="sm">
            @2022 Devjet
          </Text>
        </Flex>
        <Link href="https://www.linkedin.com/in/matias-zapata-b57406143/?locale=en_US">
          <Icon as={FaLinkedin} h="6" cursor="pointer" />
        </Link>
      </Flex>
    </VStack>
  );
}

export default Footer;
