import React from "react";
import { Select } from "@chakra-ui/react";
import { PostMetadata } from "types/Post";

function CategoriesFilter({
  setCategory,
  postsMetadata,
}: {
  setCategory: (category: string) => void;
  postsMetadata: PostMetadata[];
}) {
  const postCategories = postsMetadata
    ?.map((p) => p.category)
    .filter((c) => c !== undefined) as string[];
  const categories = Array.from(new Set(postCategories));

  return (
    <Select
      maxW={{ base: "", md: "160px" }}
      bg="white"
      onChange={(e) => setCategory(e.target.value)}
    >
      <option value="all">All categories</option>
      {categories.map((c, i) => (
        <option key={i} value={c}>
          {c}
        </option>
      ))}
    </Select>
  );
}

export default CategoriesFilter;
