export type PostMetadata = {
  title: string;
  date: string;
  summary: string;
  tags?: string[] | undefined;
  image?: string | undefined;
  category?: "basics" | "auth" | "recipes" | "snippets" | undefined;
  pro?: boolean | undefined;
  url: string;
  slug: string;
  stack: string;
};
