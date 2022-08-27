import React from "react";
import NextLink from "next/link";
import { Heading, Text, Link } from "@chakra-ui/react";
import { parseISO, format } from "date-fns";
import { BlogFrontMatter } from "../types/Blog";

function BlogPost({ title, publishedAt, summary, slug }: BlogFrontMatter) {
  return (
    <NextLink href={`blog/${slug}`} passHref>
      <Link>
        <Heading>{title}</Heading>
        <Text>{format(parseISO(publishedAt), "MMMM dd, yyyy")}</Text>
        <Text>{summary}</Text>
      </Link>
    </NextLink>
  );
}

export default BlogPost;
