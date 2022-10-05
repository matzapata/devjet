export type PostMetadata = {
  title: string;
  date: string;
  summary: string;
  tags?: string[] | undefined;
  image?: string | undefined;
  category?: string | undefined;
  pro?: boolean | undefined;
  url: string;
  slug: string;
  stacks: string[];
  comingsoon?: boolean;
  generators: number;
};
