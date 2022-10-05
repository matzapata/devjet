import React from "react";
import { Select, useColorMode } from "@chakra-ui/react";

function CategoriesFilter({ setStack }: { setStack: (stack: string) => void }) {
  const { colorMode } = useColorMode();

  return (
    <Select
      borderRadius="3px"
      maxW={{ base: "", md: "160px" }}
      bg={colorMode === "light" ? "white" : "gray.800"}
      onChange={(e) => setStack(e.target.value)}
    >
      <option value="all">All</option>
      <option value="react">REACT</option>
      <option value="nextjs">NEXTJS</option>
    </Select>
  );
}

export default CategoriesFilter;
