import React, { useMemo } from "react";

import { getFiles, getFileBySlug } from "../../utils/mdx";
import BlogLayout from "../../layout/blog";
import { GetStaticPaths, GetStaticProps } from "next";
import { BlogFrontMatter } from "../../types/Blog";
import { getMDXComponent } from "mdx-bundler/client";
import NavBar from "../../components/NavBar";

function Blog({
  code,
  frontMatter,
}: {
  code: string;
  frontMatter: BlogFrontMatter;
}) {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <BlogLayout frontMatter={frontMatter}>
      <Component />
    </BlogLayout>
  );
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
