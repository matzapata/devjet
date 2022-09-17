import React, { useEffect } from "react";

import PostLayout from "../../layout/post";
import { allPosts, Post } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { GetStaticPropsContext } from "next";
import { useAppDispatch } from "redux/store";
import { fetchReadingList } from "redux/slices/userThunk";
import { useUser } from "@supabase/auth-helpers-react";
import redirect from "nextjs-redirect";

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
  const PricingRedirect = redirect("/pricing");
  const { user } = useUser();

  useEffect(() => {
    dispatch(fetchReadingList());
  }, [dispatch]);

  if (user?.user_metadata.pro === true) {
    return (
      <PostLayout post={post}>
        <MDXContent />
      </PostLayout>
    );
  } else
    return (
      <PricingRedirect>
        Pro members only, subscribe to get access
      </PricingRedirect>
    );
}

export default Post;
