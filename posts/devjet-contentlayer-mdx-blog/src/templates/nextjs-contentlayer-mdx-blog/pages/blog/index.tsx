import React from "react";
import {
  Container,
  Heading,
  Link,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { allPosts, Post } from "contentlayer/generated";
import type { GetStaticPropsResult } from "next";
import Head from "next/head";
import NextLink from "next/link";

export async function getStaticProps(): Promise<
  GetStaticPropsResult<{ posts: Post[] }>
> {
  return { props: { posts: allPosts } };
}

function Blog({ posts }: { posts: Post[] }) {
  return (
    <>
      <Head>
        <title>NextJs Content Layer Blog Template</title>
      </Head>

      <Container maxW="container.md" mt="16">
        <Heading mb="8">My Blog Posts</Heading>
        <UnorderedList>
          {posts.map((post, idx) => (
            <ListItem key={idx}>
              <Link as={NextLink} href={post.url}>
                {post.title}
              </Link>
            </ListItem>
          ))}
        </UnorderedList>
      </Container>
    </>
  );
}

export default Blog;
