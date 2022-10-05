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
  useColorMode,
  Image,
  Grid,
  GridItem,
  useBreakpointValue,
} from "@chakra-ui/react";

import NavBar from "components/NavBar";
import Footer from "components/Footer";
import PostCard from "components/PostCard";

import { compareDesc } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";
import Pagination from "components/Pagination";
import CategoriesFilter from "components/CategoriesFilter";
import StackFilter from "components/StackFilter";
import NextLink from "next/link";
import { PostMetadata } from "types/Post";
import { extractMetadata } from "lib/posts";
import Newsletter from "components/Newsletter";
import LifetimePlanCard from "components/LifetimePlanCard";
import Script from "next/script";

export async function getStaticProps() {
  const posts: Post[] = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });
  const postsMetadata = posts.map((p) => extractMetadata(p));

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
  const [stack, setStack] = useState("react");
  const itemsPerPage = 10;
  const { colorMode } = useColorMode();
  const consoleExample = useBreakpointValue({
    base: "/landing-console-example-sm.png",
    md: "/landing-console-example.png",
  });

  useEffect(() => {
    setFilteredBlogPosts(
      postsMetadata
        .filter((p) =>
          p.title.toLowerCase().includes(searchValue.toLowerCase())
        )
        .filter((p) => p.url !== "/posts/quickstart")
        .filter((p) => p.category === category || category === "all")
        .filter((p) => p.stacks.includes(stack) || stack === "all")
        .sort((a, b) => {
          if (a.comingsoon === true || b.comingsoon === true) return -1;
          else return Number(new Date(b.date)) - Number(new Date(a.date));
        })
        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
    );
  }, [postsMetadata, searchValue, page, category, stack]);

  return (
    <>
      <Head>
        <title>Devjet</title>
      </Head>
      <Box>
        <NavBar />
        <Container w="full" maxW="container.lg">
          <Heading
            textAlign="center"
            letterSpacing="tight"
            fontFamily="Fira code"
            mb="10"
            mt="20"
            as="h1"
            size={{ base: "2xl", md: "3xl" }}
          >
            Making it easy and fast to build full-stack web apps
          </Heading>
          <Text
            textAlign="center"
            fontFamily="Fira code"
            mx="auto"
            maxW="xl"
            fontSize="lg"
            color={colorMode === "light" ? "gray.600" : "gray.400"}
          >
            Devjet is a collection of code recipes and generators to help your
            build full stack web applications with REACT, and NEXTJS in no time.
          </Text>

          <Stack
            justifyContent="center"
            w="full"
            mt="6"
            spacing="4"
            direction={{ base: "column", md: "row" }}
          >
            <NextLink href="https://usedevjet.gumroad.com/l/full-access">
              <Button size="lg" colorScheme="blue" borderRadius="3px">
                Get all access
              </Button>
            </NextLink>
            <NextLink href="/posts/quickstart">
              <Button
                borderRadius="3px"
                colorScheme="gray"
                variant="outline"
                mt="6"
                size="lg"
                color="gray.500"
                border="1px"
              >
                Quickstart
              </Button>
            </NextLink>
          </Stack>
        </Container>

        <Container pt="96px" maxW="container.lg">
          <Image
            shadow="lg"
            src={consoleExample}
            alt="devjet console interaction example"
          />
        </Container>

        <Divider
          my="14"
          borderColor={colorMode === "light" ? "gray.200" : "gray.600"}
        />

        <Container maxW="container.lg">
          <Heading
            textAlign="center"
            letterSpacing="tight"
            mb="24"
            as="h1"
            size="2xl"
            maxW="2xl"
            mx="auto"
            fontFamily="Fira code"
          >
            Explore recipes and generators to grow your web app ideas
          </Heading>
          <Stack direction={{ base: "column", md: "row" }} spacing={2} my="6">
            <InputGroup w="100%">
              <Input
                bg={colorMode === "light" ? "white" : "gray.800"}
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
            <StackFilter setStack={(s) => setStack(s)} />
          </Stack>
          <Box mb="8">
            <CategoriesFilter
              category={category}
              postsMetadata={postsMetadata}
              setCategory={(c) => setCategory(c)}
            />
          </Box>

          <Box
            borderTop="1px"
            borderColor={colorMode === "light" ? "gray.200" : "gray.600"}
            mb="20"
          >
            {!filteredBlogPosts.length && "No posts found :(("}
            {filteredBlogPosts.map((p, i) => (
              <PostCard key={i} postMetadata={p} />
            ))}
            <Flex justifyContent="center" mt="8">
              <Pagination
                onPageChange={(page) => setPage(page)}
                initialPage={page}
                lastPage={Math.ceil(postsMetadata.length / itemsPerPage)}
              />
            </Flex>
          </Box>
        </Container>

        <Container maxW="container.lg">
          <Newsletter />
        </Container>

        <Footer />
      </Box>
    </>
  );
}
