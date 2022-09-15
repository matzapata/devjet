import React from "react";
import Head from "next/head";
import { parseISO, format } from "date-fns";
import { Heading, Text, Flex, Container, Tag } from "@chakra-ui/react";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Post } from "contentlayer/generated";
import ToggleReadingList from "components/ToggleReadingList";

function PostLayout({ post, children }: { post: Post; children: JSX.Element }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Container as="article" w="full" maxW="container.md">
        <NavBar />
        <Flex justifyContent="space-between" mt="16" alignItems="center">
          <Text fontSize="sm">
            {format(parseISO(post.date), "MMMM dd, yyyy")}
          </Text>
          <ToggleReadingList postSlug={post.url.replace("/posts/", "")} />
        </Flex>
        <Heading letterSpacing="tight" mb="2" mt="2" as="h1" size="2xl">
          {post.title}
        </Heading>
        <Text mt="4">{post.summary}</Text>
        <Flex justifyContent="space-between" mt="2" alignItems="center">
          <Flex>
            {post.tags?.map((t, i) => (
              <Tag size="sm" mr="2" key={i}>
                {t}
              </Tag>
            ))}
          </Flex>
        </Flex>

        <Prose className="prose" mb="20">
          {children}
        </Prose>

        <Footer />
      </Container>
    </>
  );
}

export default PostLayout;
