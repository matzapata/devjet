import React from "react";
import NextLink from "next/link";
import {
  Text,
  Link,
  Box,
  Image,
  HStack,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { parseISO, format } from "date-fns";
import { Post } from "contentlayer/generated";
import ToggleReadingList from "./ToggleReadingList";

function BlogPostCard({ post }: { post: Post }) {
  return (
    <Box
      p="6"
      border="1px"
      bg={useColorModeValue("white", "gray.800")}
      mb="4"
      borderColor="gray.200"
      borderRadius="8"
      shadow="md"
    >
      <NextLink href={post.url} passHref>
        <Link fontSize="lg" fontWeight="medium" color="blue.500">
          {post.title}
        </Link>
      </NextLink>
      <Text color="gray.600" mt="2">
        {post.summary}
      </Text>
      <Text fontSize="sm" mb="2" color="gray.600">
        Updated on {format(parseISO(post.date), "MMMM dd, yyyy")}
      </Text>
      <Flex alignItems="center" mt="4" justifyContent="space-between">
        <HStack alignItems="center">
          <Image
            border="1px solid"
            borderColor="gray.200"
            src={post.image}
            h="5"
            w="5"
            borderRadius="full"
            alt="post-logo"
          />
          <Text color="gray.500" fontWeight="500">
            {post.category}
          </Text>
        </HStack>
        <ToggleReadingList postSlug={post.url.replace("/posts/", "")} />
      </Flex>
    </Box>
  );
}

export default BlogPostCard;
