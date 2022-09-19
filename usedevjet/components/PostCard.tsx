import React from "react";
import NextLink from "next/link";
import { Text, Link, Box, Image, HStack, Flex, Icon } from "@chakra-ui/react";
import { parseISO, format } from "date-fns";
import ToggleReadingList from "./ToggleReadingList";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { PostMetadata } from "types/Post";

function BlogPostCard({ postMetadata }: { postMetadata: PostMetadata }) {
  return (
    <Box py="6" borderBottom="1px" borderColor="gray.300">
      <Flex alignItems="center" justifyContent="space-between">
        <Text>
          <NextLink href={postMetadata.url} passHref>
            <Link fontSize="xl" fontWeight="650">
              {postMetadata.title}
            </Link>
          </NextLink>
          {postMetadata.stack !== "all" && ` - ${postMetadata.stack}`}
        </Text>
        {postMetadata.pro && <Icon mx="2" as={LockClosedIcon} />}
      </Flex>
      <Text color="gray.600" mt="1">
        {postMetadata.summary}
      </Text>
      <Text fontSize="sm" mb="2" color="gray.600">
        Updated on {format(parseISO(postMetadata.date), "MMMM dd, yyyy")}
      </Text>
      <Flex alignItems="center" mt="4" justifyContent="space-between">
        <HStack alignItems="center">
          <Image
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            src={postMetadata.image}
            h="5"
            w="5"
            borderRadius="full"
            alt="post-logo"
          />
          <Text color="gray.600" fontWeight="500">
            {postMetadata.category}
          </Text>
        </HStack>
        <ToggleReadingList postSlug={postMetadata.url.replace("/posts/", "")} />
      </Flex>
    </Box>
  );
}

export default BlogPostCard;
