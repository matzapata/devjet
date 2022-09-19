import React, { useEffect } from "react";

import PostLayout from "components/PostLayout";
import { allPosts } from "contentlayer/generated";
import { GetServerSidePropsContext } from "next";
import { useAppDispatch } from "redux/store";
import { fetchReadingList } from "redux/slices/userThunk";
import { extractMetadata } from "lib/posts";
import { PostMetadata } from "types/Post";
import PostLayoutProtected from "components/PostLayoutProtected";
import { getUser } from "@supabase/auth-helpers-nextjs";
import NotFound from "components/NotFound";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const post = allPosts.find((p) => p.slug === ctx.params?.slug);
  if (post === undefined) return {};

  if (post.pro === true) {
    const { user } = await getUser(ctx);

    if (user?.user_metadata.plan !== undefined) {
      return {
        props: {
          postMetadata: extractMetadata(post),
          body: post.body.code,
        },
      };
    } else return { props: { postMetadata: extractMetadata(post) } };
  } else {
    return {
      props: { postMetadata: extractMetadata(post), body: post.body.code },
    };
  }
}

function Post({
  postMetadata,
  body,
}: {
  postMetadata?: PostMetadata;
  body?: string;
}) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchReadingList());
  }, [dispatch]);

  if (!postMetadata) return <NotFound />;
  else if (body) return <PostLayout postMetadata={postMetadata} body={body} />;
  else return <PostLayoutProtected postMetadata={postMetadata} />;
}

export default Post;
