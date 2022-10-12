import { GeneratorToolbox } from "devjet";

module.exports = {
  description: "Example generator",
  run: async (toolbox: GeneratorToolbox) => {
    if (toolbox.context.stack === "react") {
      toolbox.print.error(
        "Sorry, this generator is only available for nextjs projects."
      );
    }

    await toolbox.extendPackage({
      dependencies: {
        contentlayer: "^0.2.4",
        "next-contentlayer": "^0.2.4",
        "@nikolovlazar/chakra-ui-prose": "1.2.1",
      },
    });

    await toolbox.template.generateTree({
      templateDirectory: "nextjs-contentlayer-mdx-blog",
    });

    toolbox.print.warning(
      "Please manually update next.config.js following usedevjet.com recipe"
    );
    toolbox.print.warning(
      "Please manually update tsconfig.json following usedevjet.com recipe"
    );
    toolbox.print.warning(
      "Please manually update utils/chakraTheme.ts following usedevjet.com recipe"
    );
  },
};
