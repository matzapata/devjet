import React from "react";
import { Box, Link, Text } from "@chakra-ui/react";
import ReactLink from "next/link";

function QuickStartCard() {
  return (
    <ReactLink href="/posts/quickstart">
      <Box
        border="1px"
        p="4"
        shadow="sm"
        borderColor="blue.200"
        bgColor="blue.50"
        borderRadius="4"
        cursor="pointer"
        mb="4"
      >
        <Link fontWeight="600" fontSize="md" mb="2" color="gray.900">
          Quickstart
        </Link>
        <Text color="gray.600" fontSize="sm">
          Learn the basics of devjet tech stack and workflow to get started
          building your projects.
        </Text>
      </Box>
    </ReactLink>
  );
}

export default QuickStartCard;
