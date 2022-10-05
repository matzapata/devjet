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
      options: [
        "auth",
        "basics",
        "analytics",
        "cms",
        "ui-ux",
        "deployment",
        "database",
        "devtools",
        "ecommerce",
        "images",
        "payment",
        "seo",
        "security",
        "performance",
        "monitoring",
        "marketing",
        "fonts",
      ],
      required: true,
    },
    pro: {
      type: "boolean",
      required: true,
      default: false,
    },
    generators: {
      type: "number",
      required: true,
      default: 0,
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
    stacks: {
      type: "list",
      of: "string",
      resolve: (doc) => {
        const slug = doc._raw.flattenedPath;
        const stacks = slug.split("-")[0].split("_");

        const postStacks = [];
        if (stacks.includes("pern")) postStacks.push("pern");
        if (stacks.includes("nextjs")) postStacks.push("nextjs");
        if (stacks.includes("react")) postStacks.push("react");

        return postStacks;
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
