import React from "react";
import Head from "next/head";
import { parseISO, format } from "date-fns";
import { Heading, Text, Flex, Container, Tag } from "@chakra-ui/react";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Post } from "contentlayer/generated";

function PostLayout({ post, children }: { post: Post; children: JSX.Element }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Container as="article" w="full" maxW="container.md">
        <NavBar />
        <Text fontSize="sm" mt="16">
          {format(parseISO(post.date), "MMMM dd, yyyy")}
        </Text>
        <Heading letterSpacing="tight" mb="2" mt="2" as="h1" size="2xl">
          {post.title}
        </Heading>
        <Flex justifyContent="space-between" mt="4" alignItems="center">
          <Flex>
            {post.tags?.map((t, i) => (
              <Tag size="sm" mr="2" key={i}>
                {t}
              </Tag>
            ))}
          </Flex>
        </Flex>
        <Text mt="4">{post.summary}</Text>

        <Prose className="prose" mb="20">
          {children}
        </Prose>

        <Footer />
      </Container>
    </>
  );
}

export default PostLayout;
