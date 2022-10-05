import React from "react";
import { Flex, Tag } from "@chakra-ui/react";
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
            outline={isActive ? "2px solid" : ""}
            outlineColor="teal.400"
            onClick={() => setCategory(c)}
            cursor="pointer"
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
