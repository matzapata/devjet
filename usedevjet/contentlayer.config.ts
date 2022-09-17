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
      required: true,
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
      required: false,
    },
    image: {
      type: "string",
      description: "Image that will be rendered on the post card",
      required: false,
    },
    category: {
      type: "enum",
      options: ["basics", "auth", "recipes", "snippets"],
      required: false,
    },
    pro: {
      type: "boolean",
      required: false,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/posts/${doc._raw.flattenedPath}`,
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
