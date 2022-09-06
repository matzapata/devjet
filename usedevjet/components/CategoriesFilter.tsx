import React from "react";
import { Button, HStack } from "@chakra-ui/react";
import { allPosts } from "contentlayer/generated";

function CategoriesFilter({
  setCategory,
}: {
  setCategory: (category: string) => void;
}) {
  const categories = [
    "all",
    ...allPosts.map((p) => p.category).filter((c) => c !== undefined),
  ];
  return (
    <HStack>
      {categories.map((c, i) => (
        <Button size="sm" key={i} onClick={() => setCategory(c as string)}>
          {c}
        </Button>
      ))}
    </HStack>
  );
}

export default CategoriesFilter;
