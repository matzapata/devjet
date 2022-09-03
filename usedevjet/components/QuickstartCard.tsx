import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import ReactLink from "next/link";

function QuickStartCard() {
  return (
    <ReactLink href="/posts/quickstart">
      <Box
        border="1px"
        p="4"
        borderColor="blue.200"
        bgColor="blue.50"
        borderRadius="6"
        cursor="pointer"
        _hover={{
          border: "2px",
          borderColor: "blue.200",
        }}
      >
        <Heading size="sm" mb="1">
          Quickstart
        </Heading>
        <Text>
          Learn the basics of devjet tech stack and workflow to get started
          building your projects.
        </Text>
      </Box>
    </ReactLink>
  );
}

export default QuickStartCard;
