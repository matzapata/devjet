import React from "react";
import { Select } from "@chakra-ui/react";

function CategoriesFilter({ setStack }: { setStack: (stack: string) => void }) {
  return (
    <Select maxW="160px" bg="white" onChange={(e) => setStack(e.target.value)}>
      <option value="all">All stacks</option>
      <option value="pern">PERN</option>
      <option value="nextjs">NEXTJS</option>
    </Select>
  );
}

export default CategoriesFilter;
