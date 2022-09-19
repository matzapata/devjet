import React from "react";
import { Container, Box } from "@chakra-ui/react";
import NavBar from "components/NavBar";
import ProCardC2A from "components/ProCardC2A";
import PostHeader from "./PostHeader";
import { PostMetadata } from "types/Post";

function PostLayoutProtected({ postMetadata }: { postMetadata: PostMetadata }) {
  return (
    <Box>
      <Container as="article" w="full" maxW="container.md">
        <NavBar />
        <PostHeader postMetadata={postMetadata} />
      </Container>
      <ProCardC2A />
    </Box>
  );
}

export default PostLayoutProtected;
