import React from "react";
import { Box, Button, HStack } from "@chakra-ui/react";
import { allPosts } from "contentlayer/generated";
import { ChevronRightIcon } from "@chakra-ui/icons";

function CategoriesFilter({
  setCategory,
}: {
  setCategory: (category: string) => void;
}) {
  const postCategories = [
    "all",
    ...allPosts.map((p) => p.category).filter((c) => c !== undefined),
  ];
  const categories = Array.from(new Set(postCategories));

  return (
    <Box position="relative">
      <Box
        overflowX="scroll"
        css={{
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <HStack width="fit-content">
          {categories.map((c, i) => (
            <Button
              display="block"
              size="sm"
              key={i}
              onClick={() => setCategory(c as string)}
            >
              {c}
            </Button>
          ))}
        </HStack>
      </Box>
      <Box
        px="2"
        h="full"
        bg="gray.50"
        borderRadius="0"
        position="absolute"
        top="0"
        right="0"
      >
        <ChevronRightIcon />
      </Box>
    </Box>
  );
}

export default CategoriesFilter;
