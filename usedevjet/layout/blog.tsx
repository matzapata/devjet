import React from "react";
import Head from "next/head";
import { parseISO, format } from "date-fns";
import { Heading, Text, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BlogFrontMatter } from "../types/Blog";

function BlogLayout({
  children,
  frontMatter,
}: {
  children: JSX.Element;
  frontMatter: BlogFrontMatter;
}) {
  const router = useRouter();
  const slug = router.asPath.replace("/blog", "");

  return (
    <>
      <Head>
        <title>{slug}</title>
      </Head>
      <Stack as="article">
        <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
          {frontMatter.title}
        </Heading>
        <Text fontSize="sm">
          {format(parseISO(frontMatter.publishedAt), "MMMM dd, yyyy")}
        </Text>
        {children}
      </Stack>
    </>
  );
}

export default BlogLayout;
