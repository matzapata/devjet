import React, { useEffect, useState } from "react";
import { Button, HStack } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

function Pagination({
  onPageChange,
  lastPage,
  initialPage,
}: {
  onPageChange: (newPage: number) => void;
  initialPage?: number;
  lastPage?: number;
}) {
  const [page, setPage] = useState(initialPage ? initialPage : 1);

  useEffect(() => {
    onPageChange(page);
  }, [page, onPageChange]);

  return (
    <HStack spacing={8}>
      <Button
        variant="link"
        onClick={() => setPage((page) => page - 1)}
        disabled={page === 1}
        leftIcon={<ArrowBackIcon />}
      >
        Previous
      </Button>
      <Button
        variant="link"
        onClick={() => setPage((page) => page + 1)}
        disabled={
          lastPage !== undefined ? page === lastPage || lastPage === 0 : false
        }
        rightIcon={<ArrowForwardIcon />}
      >
        Next
      </Button>
    </HStack>
  );
}

export default Pagination;
