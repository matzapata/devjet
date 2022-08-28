import React, { useState } from "react";
import Head from "next/head";
import { Heading, Input, InputGroup } from "@chakra-ui/react";
import { getAllFilesFrontMatter } from "../utils/mdx";
import BlogPostCard from "../components/BlogPostCard";
import { SearchIcon } from "@chakra-ui/icons";
import { BlogFrontMatter } from "../types/Blog";
import { Container } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { Text } from "@chakra-ui/react";
import { InputLeftElement } from "@chakra-ui/react";

export default function Blog({ posts }: { posts: BlogFrontMatter[] }) {
  const [searchValue, setSearchValue] = useState("");

  const filteredBlogPosts = posts.filter((frontMatter) =>
    frontMatter.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <Container w="full" maxW="container.md">
        <NavBar />
        <Heading letterSpacing="tight" mb="4" mt="16" as="h1" size="2xl">
          All the resources you need to speed up your development
        </Heading>
        <Text>
          At devjet we&apos;ve created expertly crafted guides, examples,
          templates, and resources to help you build your websites faster. Get
          started by checking out our free guides, or browsing all of the
          examples in the categories you&apos;re most curious about.
        </Text>

        <InputGroup mb="4" mt="8" w="100%" bg="white">
          <Input
            aria-label="Search by title"
            placeholder="Search by title"
            onChange={(e: any) => setSearchValue(e.target.value)}
          />
          <InputLeftElement>
            <SearchIcon color="gray.300" />
          </InputLeftElement>
        </InputGroup>

        {!filteredBlogPosts.length && "No posts found :(("}
        {filteredBlogPosts.map((frontMatter) => (
          <BlogPostCard key={frontMatter.title} {...frontMatter} />
        ))}
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter("blog");

  return { props: { posts } };
}
