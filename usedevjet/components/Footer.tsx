import React from "react";
import {
  Divider,
  Flex,
  Text,
  VStack,
  Icon,
  Link,
  HStack,
  IconButton,
  useColorMode,
  Container,
} from "@chakra-ui/react";
import { BrandFavicon } from "./Brand";
import { FaLinkedin } from "react-icons/fa";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

function Footer() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW="container.lg">
      <VStack pt="20" pb="10">
        <Divider />
        <Flex justifyContent="space-between" alignItems="center" w="100%">
          <Flex w="full" py="4">
            <BrandFavicon h="5" mr="2" />
            <Text fontWeight="500" fontSize="sm">
              @2022 Devjet
            </Text>
          </Flex>
          <HStack alignItems="center" spacing="4">
            <Link
              h="7"
              href="https://www.linkedin.com/in/matias-zapata-b57406143/?locale=en_US"
            >
              <Icon as={FaLinkedin} h="7" cursor="pointer" />
            </Link>
            <IconButton
              size="sm"
              aria-label="Toggle Mode"
              onClick={toggleColorMode}
            >
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </IconButton>
          </HStack>
        </Flex>
      </VStack>
    </Container>
  );
}

export default Footer;
