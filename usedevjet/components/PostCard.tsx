import React from "react";
import NextLink from "next/link";
import { Text, Link, Box, Image, HStack, Flex, Icon } from "@chakra-ui/react";
import { parseISO, format } from "date-fns";
import { Post } from "contentlayer/generated";
import ToggleReadingList from "./ToggleReadingList";
import { LockClosedIcon } from "@heroicons/react/24/outline";

function BlogPostCard({ post }: { post: Post }) {
  return (
    <Box py="6" borderBottom="1px" borderColor="gray.300">
      <Flex alignItems="center" justifyContent="space-between">
        <Text>
          <NextLink href={post.pro ? "/pricing" : post.url} passHref>
            <Link fontSize="xl" fontWeight="650">
              {post.title}
            </Link>
          </NextLink>
          {post.stack !== "all" && ` - ${post.stack}`}
        </Text>
        {post.pro && <Icon as={LockClosedIcon} />}
      </Flex>
      <Text color="gray.600" mt="1">
        {post.summary}
      </Text>
      <Text fontSize="sm" mb="2" color="gray.600">
        Updated on {format(parseISO(post.date), "MMMM dd, yyyy")}
      </Text>
      <Flex alignItems="center" mt="4" justifyContent="space-between">
        <HStack alignItems="center">
          <Image
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            src={post.image}
            h="5"
            w="5"
            borderRadius="full"
            alt="post-logo"
          />
          <Text color="gray.600" fontWeight="500">
            {post.category}
          </Text>
        </HStack>
        <ToggleReadingList postSlug={post.url.replace("/posts/", "")} />
      </Flex>
    </Box>
  );
}

export default BlogPostCard;
