import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: false,
      default: new Date(Date.now()).toISOString(),
    },
    comingsoon: {
      type: "boolean",
      required: true,
      default: false,
    },
    summary: {
      type: "string",
      description: "Small resume of the content of the post",
      required: true,
    },
    tags: {
      type: "list",
      of: { type: "string" },
      description: "Keywords representing the the post content",
      required: true,
    },
    image: {
      type: "string",
      description: "Image that will be rendered on the post card",
      required: true,
    },
    category: {
      type: "enum",
      options: ["basics", "auth", "recipes", "snippets"],
      required: true,
    },
    pro: {
      type: "boolean",
      required: true,
      default: false,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/posts/${doc._raw.flattenedPath}`,
    },
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath,
    },
    stack: {
      type: "string",
      resolve: (doc) => {
        const slug = doc._raw.flattenedPath;
        if (slug.split("-")[0] === "pern") return "pern";
        else if (slug.split("-")[0] === "nextjs") return "nextjs";
        else return "all";
      },
    },
  },
}));

export default makeSource({
  contentDirPath: "posts",
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [rehypeSlug, rehypeCodeTitles, rehypePrism],
  },
});
