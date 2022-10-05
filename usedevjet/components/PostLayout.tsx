import React from "react";
import { Container, Box, useColorMode } from "@chakra-ui/react";
import NavBar from "components/NavBar";
import Footer from "components/Footer";
import { useMDXComponent } from "next-contentlayer/hooks";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import { PostMetadata } from "types/Post";
import PostHeader from "./PostHeader";
import MDXComponents from "components/MDXComponents";
import Newsletter from "./Newsletter";

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
      <NavBar />
      <Container as="article" w="full" maxW="container.lg">
        <PostHeader postMetadata={postMetadata} />

        {postMetadata.comingsoon ? (
          <Box>
            <Prose
              className={colorMode === "light" ? "prose" : "prose-dark"}
              mb="8"
              mt="16"
            >
              <blockquote>
                Hey! we are still working on this one. Glad to know our work is
                gonna worth it. In the meantime subscribe to the newsletter so
                we can let you know once the post is out!!
              </blockquote>
            </Prose>
            <Newsletter />
          </Box>
        ) : (
          <Prose
            className={colorMode === "light" ? "prose" : "prose-dark"}
            mb="20"
            mt="16"
          >
            <MDXContent components={MDXComponents} />
          </Prose>
        )}
      </Container>
      <Footer />
    </Box>
  );
}

export default PostLayout;
