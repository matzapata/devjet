import React from "react";
import NextLink from "next/link";
import {
  Text,
  Link,
  Box,
  Image,
  HStack,
  Flex,
  Icon,
  Tag,
  useColorMode,
} from "@chakra-ui/react";
import { parseISO, format } from "date-fns";
import ToggleReadingList from "./ToggleReadingList";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { PostMetadata } from "types/Post";

function BlogPostCard({ postMetadata }: { postMetadata: PostMetadata }) {
  const { colorMode } = useColorMode();

  return (
    <Box
      py="6"
      borderBottom="1px"
      borderColor={colorMode === "light" ? "gray.200" : "gray.600"}
    >
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
      <Text color={colorMode === "light" ? "gray.600" : "gray.400"} mt="1">
        {postMetadata.summary}
      </Text>
      {postMetadata.comingsoon ? (
        <Tag colorScheme="green" variant="subtle" mt="2">
          Coming soon
        </Tag>
      ) : (
        <Text fontSize="sm" mb="2" color="gray.600">
          Updated on {format(parseISO(postMetadata.date), "MMMM dd, yyyy")}
        </Text>
      )}
      <Flex alignItems="center" mt="4" justifyContent="space-between">
        <HStack alignItems="center">
          <Image
            bg="white"
            border="1px solid"
            borderColor={colorMode === "light" ? "gray.200" : "gray.600"}
            src={postMetadata.image}
            h="5"
            w="5"
            borderRadius="full"
            alt="post-logo"
          />
          <Text
            color={colorMode === "light" ? "gray.600" : "gray.400"}
            fontWeight="500"
          >
            {postMetadata.category}
          </Text>
        </HStack>
        <ToggleReadingList postSlug={postMetadata.url.replace("/posts/", "")} />
      </Flex>
    </Box>
  );
}

export default BlogPostCard;
