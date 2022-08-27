import React from "react";

import { getFiles, getFileBySlug } from "../../utils/mdx";
import BlogLayout from "../../layout/blog";
import { GetStaticPaths, GetStaticProps } from "next";
import hydrate from "next-mdx-remote/hydrate";
import { BlogFrontMatter } from "../../types/Blog";
import { MdxRemote } from "next-mdx-remote/types";

function Blog({
  mdxSource,
  frontMatter,
}: {
  mdxSource: MdxRemote.Source;
  frontMatter: BlogFrontMatter;
}) {
  const content = hydrate(mdxSource);

  return <BlogLayout frontMatter={frontMatter}>{content as any}</BlogLayout>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getFiles("blog");

  return {
    paths: posts.map((p) => ({
      params: {
        slug: p.replace(/\.mdx/, ""),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getFileBySlug("blog", params?.slug);
  return { props: post };
};

export default Blog;
