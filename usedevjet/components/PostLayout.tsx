import React from "react";
import { Container, Box } from "@chakra-ui/react";
import NavBar from "components/NavBar";
import Footer from "components/Footer";
import { useMDXComponent } from "next-contentlayer/hooks";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import { PostMetadata } from "types/Post";
import PostHeader from "./PostHeader";

function PostLayout({
  postMetadata,
  body,
}: {
  postMetadata: PostMetadata;
  body: string;
}) {
  const MDXContent = useMDXComponent(body);

  return (
    <Box>
      <Container as="article" w="full" maxW="container.md">
        <NavBar />
        <PostHeader postMetadata={postMetadata} />

        <Prose className="prose" mb="20">
          <MDXContent />
        </Prose>
        <Footer />
      </Container>
    </Box>
  );
}

export default PostLayout;
