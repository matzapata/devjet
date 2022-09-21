import { Post } from "contentlayer/generated";
import { PostMetadata } from "types/Post";

export function extractMetadata(post: Post | undefined): PostMetadata | null {
  if (post === undefined) return null;
  const metadata: PostMetadata = {
    title: post.title,
    date: post.date,
    summary: post.summary,
    tags: post.tags,
    url: post.url,
    slug: post.slug,
    stack: post.stack,
  };
  if (post.tags !== undefined) metadata.tags = post.tags;
  if (post.image !== undefined) metadata.image = post.image;
  if (post.category !== undefined) metadata.category = post.category;
  if (post.pro !== undefined) metadata.pro = post.pro;
  if (post.comingsoon !== undefined) metadata.comingsoon = post.comingsoon;

  return metadata;
}
