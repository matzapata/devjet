import React, { useEffect } from "react";

import PostLayout from "../../layout/post";
import { allPosts, Post } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { GetStaticPropsContext } from "next";
import { useAppDispatch } from "redux/store";
import { fetchReadingList } from "redux/slices/userThunk";

export async function getStaticPaths() {
  const paths: string[] = allPosts.map((post) => post.url);
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const post: Post | undefined = allPosts.find(
    (post) => post._raw.flattenedPath === params?.slug
  );
  return { props: { post } };
}

function Post({ post }: { post: Post }) {
  const MDXContent = useMDXComponent(post.body.code);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchReadingList());
  }, [dispatch]);

  return (
    <PostLayout post={post}>
      <MDXContent />
    </PostLayout>
  );
}

export default Post;
