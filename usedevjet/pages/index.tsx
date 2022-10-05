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
  const [stack, setStack] = useState("all");
  const itemsPerPage = 10;
  const { colorMode } = useColorMode();

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
        <Container w="full" maxW="container.md">
          <NavBar />
          <Heading
            textAlign="center"
            letterSpacing="tight"
            mb="10"
            mt="16"
            as="h1"
            size="3xl"
          >
            Making it easy and fast to build full-stack web apps
          </Heading>
          <Text
            textAlign="center"
            mx="auto"
            maxW="xl"
            fontSize="lg"
            color={colorMode === "light" ? "gray.600" : "gray.400"}
          >
            Devjet is a collection of code recipes and generators to help your
            build full stack web applications with REACT, and NEXTJS in no time.
          </Text>

          <Flex justifyContent="center">
            <Stack w="full" mt="6" spacing="4">
              <NextLink href="/plans">
                <Button
                  size="lg"
                  w={{ base: "full" }}
                  colorScheme="blue"
                  bg="blue.600"
                  borderRadius="3px"
                >
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
          </Flex>
        </Container>

        <Container pt="96px">
          <Text
            textAlign="center"
            fontFamily="monospace"
            mb="6"
            color="gray.500"
            fontWeight="semibold"
            fontSize="md"
            maxW="200px"
            mx="auto"
          >
            Work with your favorite technologies
          </Text>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem
              p="2"
              borderRadius="2"
              border="1px solid"
              borderColor="gray.200"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDir="column"
            >
              <Image h="10" mb="1" src="/images/typescript.png" alt="" />
              <Text color="gray.600" fontWeight="medium">
                Typescript
              </Text>
            </GridItem>
            <GridItem
              p="2"
              borderRadius="2"
              border="1px solid"
              borderColor="gray.200"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDir="column"
            >
              <Image h="10" mb="1" src="/images/redux.png" alt="" />
              <Text color="gray.600" fontWeight="medium">
                Redux
              </Text>
            </GridItem>
            <GridItem
              p="2"
              borderRadius="2"
              border="1px solid"
              borderColor="gray.200"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDir="column"
            >
              <Image h="10" mb="1" src="/images/chakra-ui.png" alt="" />
              <Text color="gray.600" fontWeight="medium">
                Chakra ui
              </Text>
            </GridItem>
            <GridItem
              p="2"
              borderRadius="2"
              border="1px solid"
              borderColor="gray.200"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDir="column"
            >
              <Image h="10" mb="1" src="/images/vercel.svg" alt="" />
              <Text color="gray.600" fontWeight="medium">
                Vercel
              </Text>
            </GridItem>
            <GridItem
              p="2"
              borderRadius="2"
              border="1px solid"
              borderColor="gray.200"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDir="column"
            >
              <Image h="10" mb="1" src="/images/react.png" alt="" />
              <Text color="gray.600" fontWeight="medium">
                React
              </Text>
            </GridItem>
            <GridItem
              p="2"
              borderRadius="2"
              border="1px solid"
              borderColor="gray.200"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDir="column"
            >
              <Image h="10" mb="1" src="/images/nextjs.png" alt="" />
              <Text color="gray.600" fontWeight="medium">
                Nextjs
              </Text>
            </GridItem>
            <GridItem
              p="2"
              borderRadius="2"
              border="1px solid"
              borderColor="gray.200"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDir="column"
            >
              <Image h="10" mb="1" src="/images/prisma.png" alt="" />
              <Text color="gray.600" fontWeight="medium">
                Prisma
              </Text>
            </GridItem>
            <GridItem
              p="2"
              borderRadius="2"
              border="1px solid"
              borderColor="gray.200"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDir="column"
            >
              <Image h="10" mb="1" src="/images/supabase.jpg" alt="" />
              <Text color="gray.600" fontWeight="medium">
                Supabase
              </Text>
            </GridItem>
          </Grid>
        </Container>

        <Container pt="96px">
          <Text
            textAlign="center"
            fontFamily="monospace"
            mb="6"
            color="gray.500"
            fontWeight="semibold"
            fontSize="md"
            maxW="250px"
            mx="auto"
          >
            Scaffold complete projects or useful parts with devjet generators.
          </Text>
          <Image
            src="/landing-console-example-sm.png"
            alt="devjet console interaction example"
          />
        </Container>

        <Container>
          <Text
            mt="16"
            mb="2"
            fontWeight="medium"
            fontSize="lg"
            color={colorMode === "light" ? "gray.600" : "gray.300"}
            textAlign="center"
          >
            all-access
          </Text>
          <Heading
            textAlign="center"
            letterSpacing="tight"
            mb="8"
            as="h1"
            size="xl"
          >
            Get unlimited access to everything on devjet
          </Heading>

          <Flex justifyContent="center">
            <LifetimePlanCard />
          </Flex>
        </Container>

        <Divider
          my="14"
          borderColor={colorMode === "light" ? "gray.200" : "gray.600"}
        />

        <Container>
          <Heading
            textAlign="center"
            letterSpacing="tight"
            mb="8"
            as="h1"
            size="xl"
          >
            Explore receipes and generators to grow your web app ideas
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

        <Container>
          <Newsletter />
        </Container>

        <Footer />
      </Box>
    </>
  );
}
