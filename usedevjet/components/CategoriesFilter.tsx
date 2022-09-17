import React from "react";
import { Select } from "@chakra-ui/react";
import { Post } from "contentlayer/generated";

function CategoriesFilter({
  setCategory,
  posts,
}: {
  setCategory: (category: string) => void;
  posts: Post[];
}) {
  const postCategories = posts
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
