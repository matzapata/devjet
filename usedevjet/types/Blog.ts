export type BlogFrontMatter = {
  slug: string | string[] | undefined;
  title: string;
  publishedAt: string;
  summary: string;
  tags: string[];
};
