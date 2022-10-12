import React from "react";
import { Box, Container, Heading, Link } from "@chakra-ui/react";
import { allPosts, Post } from "contentlayer/generated";
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { useMDXComponent } from "next-contentlayer/hooks";
import Head from "next/head";
import NextLink from "next/link";
import { Prose } from "@nikolovlazar/chakra-ui-prose";

// Generate static paths for all posts
export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const paths = allPosts.map((post) => post.url);
  return {
    paths,
    fallback: false,
  };
}

// Find post with matching slug and return it as props to the page
export async function getStaticProps({
  params,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<{ post: Post }>> {
  const post = allPosts.find(
    (post) => post._raw.flattenedPath === params?.slug
  );

  // Redirect to homepage if post not found
  return typeof post === "undefined"
    ? {
        redirect: {
          destination: "/",
          permanent: false,
        },
      }
    : {
        props: {
          post,
        },
      };
}

function PostLayout({ post }: { post: Post }) {
  const MDXContent = useMDXComponent(post.body.code);
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>

      <Container maxW="container.md">
        <Box mb="4" mt="8">
          <Link as={NextLink} href="/blog">
            Back to blogs
          </Link>
        </Box>

        <Box mb="8">
          <Heading>{post.title}</Heading>
          <time dateTime={post.date}>{post.date}</time>
        </Box>

        <Prose>
          <MDXContent />
        </Prose>
      </Container>
    </>
  );
}

export default PostLayout;
