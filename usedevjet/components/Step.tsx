import { Box, Text, useColorMode } from "@chakra-ui/react";
import React from "react";

export default function Step({
  number,
  title,
}: {
  number: number;
  title: string;
}) {
  const { colorMode } = useColorMode();
  return (
    <Box display="flex" alignItems="center" py="4">
      <Box
        h="8"
        w="8"
        pt="1"
        display="flex"
        fontWeight="bold"
        border="1px solid"
        alignItems="center"
        borderRadius="full"
        borderColor={colorMode === "light" ? "gray.200" : "gray.800"}
        justifyContent="center"
        color="blue.500"
      >
        {number}
      </Box>
      <Text fontWeight="bold" fontSize="lg" ml="3" my="0" size="md">
        {title}
      </Text>
    </Box>
  );
}
