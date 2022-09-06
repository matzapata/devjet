import React from "react";
import NextLink from "next/link";
import { Heading, Text, Link, Box } from "@chakra-ui/react";
import { parseISO, format } from "date-fns";
import { Post } from "contentlayer/generated";

function BlogPostCard({ post }: { post: Post }) {
  return (
    <Box
      p="6"
      border="1px"
      bg="white"
      mb="4"
      borderColor="gray.200"
      borderRadius="8"
      shadow="sm"
    >
      <NextLink href={post.url} passHref>
        <Link fontSize="lg" fontWeight="medium" color="blue.500">
          {post.title}
        </Link>
      </NextLink>
      <Text color="gray.600" mt="2">
        {post.summary}
      </Text>
      <Text fontSize="sm" mb="2">
        {format(parseISO(post.date), "MMMM dd, yyyy")}
      </Text>
    </Box>
  );
}

export default BlogPostCard;
