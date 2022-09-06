import React from "react";
import NextLink from "next/link";
import { Heading, Text, Link, Box } from "@chakra-ui/react";
import { parseISO, format } from "date-fns";
import { Post } from "contentlayer/generated";

function BlogPostCard({ post }: { post: Post }) {
  return (
    <Box
      p="8"
      border="1px"
      bg="white"
      mb="4"
      borderColor="gray.200"
      borderRadius="8"
      shadow="sm"
    >
      <NextLink href={post.url} passHref>
        <Link>
          <Heading size="md">{post.title}</Heading>
          <Text fontSize="sm" mb="2">
            {format(parseISO(post.date), "MMMM dd, yyyy")}
          </Text>
          <Text>{post.summary}</Text>
        </Link>
      </NextLink>
    </Box>
  );
}

export default BlogPostCard;
