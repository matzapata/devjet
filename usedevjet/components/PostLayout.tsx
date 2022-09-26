import React from "react";
import { Container, Box, useColorMode } from "@chakra-ui/react";
import NavBar from "components/NavBar";
import Footer from "components/Footer";
import { useMDXComponent } from "next-contentlayer/hooks";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import { PostMetadata } from "types/Post";
import PostHeader from "./PostHeader";
import MDXComponents from "components/MDXComponents";

function PostLayout({
  postMetadata,
  body,
}: {
  postMetadata: PostMetadata;
  body: string;
}) {
  const MDXContent = useMDXComponent(body);
  const { colorMode } = useColorMode();

  return (
    <Box>
      <Container as="article" w="full" maxW="container.md">
        <NavBar />
        <PostHeader postMetadata={postMetadata} />

        <Prose
          className={colorMode === "light" ? "prose" : "prose-dark"}
          mb="20"
        >
          <MDXContent components={MDXComponents} />
        </Prose>
        <Footer />
      </Container>
    </Box>
  );
}

export default PostLayout;
