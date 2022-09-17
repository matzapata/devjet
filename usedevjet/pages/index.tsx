import React, { useEffect, useState } from "react";
import Head from "next/head";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Heading,
  Input,
  InputGroup,
  Text,
  Container,
  Box,
  Divider,
  Flex,
  InputRightElement,
} from "@chakra-ui/react";

import NavBar from "components/NavBar";
import Footer from "components/Footer";
import PostCard from "components/PostCard";

import { compareDesc } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";
import QuickStartCard from "components/QuickstartCard";
import Pagination from "components/Pagination";
import CategoriesFilter from "components/CategoriesFilter";
import StackFilter from "components/StackFilter";
import { useAppDispatch } from "redux/store";
import { fetchReadingList } from "redux/slices/userThunk";

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
  const [category, setCategory] = useState("all");
  const [stack, setStack] = useState("all");
  const itemsPerPage = 10;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchReadingList());
  }, [dispatch]);

  useEffect(() => {
    setFilteredBlogPosts(
      posts
        .filter((p) =>
          p.title.toLowerCase().includes(searchValue.toLowerCase())
        )
        .filter((p) => p.url !== "/posts/pern-quickstart")
        .filter((p) => p.category === category || category === "all")
        .filter((p) => p.stack === stack || stack === "all")
        .sort((a, b) => (a.title > b.title ? 1 : -1))
        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
    );
  }, [posts, searchValue, page, category, stack]);

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

        <InputGroup mb="4" mt="8" w="100%">
          <Input
            bg="white"
            shadow={"sm"}
            aria-label="Search by title"
            placeholder="Search by title"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchValue(e.target.value)
            }
          />
          <InputRightElement>
            <SearchIcon color="gray.300" />
          </InputRightElement>
        </InputGroup>

        <Flex justifyContent="space-between">
          <CategoriesFilter posts={posts} setCategory={(c) => setCategory(c)} />
          <StackFilter setStack={(s) => setStack(s)} />
        </Flex>

        <Divider my="4" />

        <Box mt="4">
          <QuickStartCard />
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
