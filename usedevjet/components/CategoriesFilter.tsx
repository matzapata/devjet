import React from "react";
import { Flex, Select, Tag, useColorMode } from "@chakra-ui/react";
import { PostMetadata } from "types/Post";

function CategoriesFilter({
  category,
  setCategory,
  postsMetadata,
}: {
  category: string;
  setCategory: (category: string) => void;
  postsMetadata: PostMetadata[];
}) {
  const postCategories = postsMetadata
    ?.map((p) => p.category)
    .filter((c) => c !== undefined) as string[];
  const categories = Array.from(new Set(postCategories));
  categories.unshift("all");

  return (
    <Flex>
      {categories.map((c, i) => {
        const isActive = category === c;

        return (
          <Tag
            border={isActive ? "2px solid" : ""}
            borderColor="blue.600"
            onClick={() => setCategory(c)}
            mr="2"
            key={i}
            size="md"
          >
            {c}
          </Tag>
        );
      })}
    </Flex>
  );
}

export default CategoriesFilter;
