import React, { useEffect, useState } from "react";
import Head from "next/head";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Container,
  Box,
  Divider,
  Flex,
} from "@chakra-ui/react";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import PostCard from "../components/PostCard";

import { compareDesc } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";
import QuickStartCard from "../components/QuickstartCard";
import Pagination from "components/Pagination";

export async function getStaticProps() {
  const posts: Post[] = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });
  return { props: { posts } };
}

export default function Blog({ posts }: { posts: Post[] }) {
  const [searchValue, setSearchValue] = useState("");
  const [filteredBlogPosts, setFilteredBlogPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setFilteredBlogPosts(
      posts
        .filter(
          (post) =>
            post.title.toLowerCase().includes(searchValue.toLowerCase()) &&
            post.url !== "/posts/quickstart"
        )
        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
    );
  }, [posts, searchValue, page]);

  return (
    <>
      <Head>
        <title>Devjet</title>
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
            shadow={"sm"}
            aria-label="Search by title"
            placeholder="Search by title"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchValue(e.target.value)
            }
          />
          <InputLeftElement>
            <SearchIcon color="gray.300" />
          </InputLeftElement>
        </InputGroup>

        <Divider my="4" />

        <QuickStartCard />

        <Box mt="4">
          {!filteredBlogPosts.length && "No posts found :(("}
          {filteredBlogPosts.map((p, i) => (
            <PostCard key={i} post={p} />
          ))}
          <Flex justifyContent="center" mt="8">
            <Pagination
              onPageChange={(page) => setPage(page)}
              initialPage={page}
              lastPage={Math.ceil(posts.length / itemsPerPage) - 1}
            />
          </Flex>
        </Box>

        <Footer />
      </Container>
    </>
  );
}
