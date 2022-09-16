import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Heading, Container, Box, Divider, Flex } from "@chakra-ui/react";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import PostCard from "../components/PostCard";

import { compareDesc } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";
import Pagination from "components/Pagination";
import { useAppDispatch, useAppSelector } from "redux/store";
import { fetchReadingList } from "redux/slices/userThunk";

export async function getStaticProps() {
  const posts: Post[] = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });
  return { props: { posts } };
}

export default function Profile({ posts }: { posts: Post[] }) {
  const [filteredBlogPosts, setFilteredBlogPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const dispatch = useAppDispatch();
  const readingList = useAppSelector((state) => state.user.readingList);

  useEffect(() => {
    dispatch(fetchReadingList());
  }, [dispatch]);

  useEffect(() => {
    setFilteredBlogPosts(
      posts
        .filter((p) => readingList.includes(p.url.replace("/posts/", "")))
        .sort((a, b) => (a.title > b.title ? 1 : -1))
        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
    );
  }, [posts, page, readingList]);

  return (
    <>
      <Head>
        <title>Devjet</title>
      </Head>
      <Container w="full" maxW="container.md">
        <Flex direction="column" justifyContent="space-between" minH="100vh">
          <Box>
            <NavBar />
            <Heading letterSpacing="tight" mb="4" mt="16" as="h1" size="xl">
              Profile
            </Heading>

            <Divider mt="4" mb="10" />

            <Heading size="md">Reading list</Heading>
            <Box mt="4">
              {!filteredBlogPosts.length && "No posts on your reading list :(("}
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
          </Box>

          <Footer />
        </Flex>
      </Container>
    </>
  );
}
