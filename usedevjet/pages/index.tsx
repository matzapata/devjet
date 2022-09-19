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
  Button,
  Stack,
  Icon,
} from "@chakra-ui/react";

import NavBar from "components/NavBar";
import Footer from "components/Footer";
import PostCard from "components/PostCard";

import { compareDesc } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";
import Pagination from "components/Pagination";
import CategoriesFilter from "components/CategoriesFilter";
import StackFilter from "components/StackFilter";
import { useAppDispatch } from "redux/store";
import { fetchReadingList } from "redux/slices/userThunk";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import NextLink from "next/link";
import { PostMetadata } from "types/Post";

function extractMetadata(post: Post): PostMetadata {
  return {
    title: post.title,
    date: post.date,
    summary: post.summary,
    tags: post.tags,
    image: post.image,
    category: post.category,
    pro: post.pro,
    url: post.url,
    slug: post.slug,
    stack: post.stack,
  };
}

export async function getStaticProps() {
  const posts: Post[] = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });
  const postsMetadata: PostMetadata[] = posts.map((p) => extractMetadata(p));

  return { props: { postsMetadata } };
}

export default function Blog({
  postsMetadata,
}: {
  postsMetadata: PostMetadata[];
}) {
  const [searchValue, setSearchValue] = useState("");
  const [filteredBlogPosts, setFilteredBlogPosts] = useState<PostMetadata[]>(
    []
  );
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
      postsMetadata
        .filter((p) =>
          p.title.toLowerCase().includes(searchValue.toLowerCase())
        )
        .filter((p) => p.url !== "/posts/quickstart")
        .filter((p) => p.category === category || category === "all")
        .filter((p) => p.stack === stack || stack === "all")
        .sort((a, b) => (a.title > b.title ? 1 : -1))
        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
    );
  }, [postsMetadata, searchValue, page, category, stack]);

  return (
    <>
      <Head>
        <title>Devjet</title>
      </Head>
      <Container w="full" maxW="container.md">
        <NavBar />
        <Heading
          textAlign="center"
          letterSpacing="tight"
          mb="4"
          mt="16"
          as="h1"
          size="3xl"
        >
          All the resources you need to{" "}
          <Box as={"span"} color="blue.400">
            speed up
          </Box>{" "}
          your development
        </Heading>
        <Text
          textAlign="center"
          mx="auto"
          maxW="xl"
          fontSize="lg"
          fontWeight="medium"
          color="gray.600"
        >
          Devjet is a collection of code guides, receipes and generators to help
          your build your PERN and NEXTJS projects in no time.
        </Text>

        <Flex justifyContent="center">
          <NextLink href="/plans">
            <Button
              mt="6"
              mr="6"
              size="lg"
              colorScheme="blue"
              rightIcon={<Icon as={ArrowLongRightIcon} />}
            >
              Get all access
            </Button>
          </NextLink>
          <NextLink href="/posts/quickstart">
            <Button colorScheme="blue" variant="link" mt="6" size="lg">
              Quickstart
            </Button>
          </NextLink>
        </Flex>

        <Divider mt="14" borderColor="gray.200" />

        <Stack direction={{ base: "column", md: "row" }} spacing={2} my="6">
          <InputGroup w="100%">
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
          <CategoriesFilter
            postsMetadata={postsMetadata}
            setCategory={(c) => setCategory(c)}
          />
          <StackFilter setStack={(s) => setStack(s)} />
        </Stack>

        <Box borderTop="1px" borderColor="gray.200">
          {!filteredBlogPosts.length && "No posts found :(("}
          {filteredBlogPosts.map((p, i) => (
            <PostCard key={i} postMetadata={p} />
          ))}
          <Flex justifyContent="center" mt="8">
            <Pagination
              onPageChange={(page) => setPage(page)}
              initialPage={page}
              lastPage={Math.ceil(postsMetadata.length / itemsPerPage) - 1}
            />
          </Flex>
        </Box>

        <Footer />
      </Container>
    </>
  );
}
