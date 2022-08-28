import React from "react";
import NextLink from "next/link";
import { Heading, Text, Link, Box } from "@chakra-ui/react";
import { parseISO, format } from "date-fns";
import { BlogFrontMatter } from "../types/Blog";

function BlogPostCard({ title, publishedAt, summary, slug }: BlogFrontMatter) {
  return (
    <Box
      p="8"
      border="1px"
      bg="white"
      mb="4"
      borderColor="gray.200"
      borderRadius="8"
    >
      <NextLink href={`blog/${slug}`} passHref>
        <Link>
          <Heading size="md">{title}</Heading>
          <Text fontSize="sm" mb="2">
            {format(parseISO(publishedAt), "MMMM dd, yyyy")}
          </Text>
          <Text>{summary}</Text>
        </Link>
      </NextLink>
    </Box>
  );
}

export default BlogPostCard;
