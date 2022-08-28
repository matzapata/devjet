import React from "react";
import Head from "next/head";
import { parseISO, format } from "date-fns";
import { Heading, Text, Flex, Container, Tag } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BlogFrontMatter } from "../types/Blog";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function BlogLayout({
  children,
  frontMatter,
}: {
  children: JSX.Element;
  frontMatter: BlogFrontMatter;
}) {
  const router = useRouter();
  const slug = router.asPath.replace("/blog/", "");

  return (
    <>
      <Head>
        <title>{slug}</title>
      </Head>
      <Container as="article" w="full" maxW="container.md">
        <NavBar />
        <Text fontSize="sm" mt="16">
          {format(parseISO(frontMatter.publishedAt), "MMMM dd, yyyy")}
        </Text>
        <Heading letterSpacing="tight" mb="2" mt="2" as="h1" size="2xl">
          {frontMatter.title}
        </Heading>
        <Flex justifyContent="space-between" mt="4" alignItems="center">
          <Flex>
            {frontMatter.tags.map((t, i) => (
              <Tag size="sm" mr="2" key={i}>
                {t}
              </Tag>
            ))}
          </Flex>
        </Flex>
        <Text mt="4">{frontMatter.summary}</Text>

        <Prose className="prose">{children}</Prose>

        <Footer />
      </Container>
    </>
  );
}

export default BlogLayout;
