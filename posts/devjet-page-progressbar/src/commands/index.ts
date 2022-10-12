import { GeneratorToolbox } from "devjet";

module.exports = {
  description: "Add page loading to your nextjs app",
  run: async (toolbox: GeneratorToolbox) => {
    if (toolbox.context.stack === "react") {
      return toolbox.print.error(
        "Sorry, this generator is only available for nextjs projects"
      );
    }

    await toolbox.extendPackage({
      dependencies: {
        "nextjs-progressbar": "^0.0.14",
      },
    });
    await toolbox.injectImports("pages/_app.tsx", [
      `import NextNProgress from "nextjs-progressbar";`,
    ]);
    await toolbox.patching.insertLine(
      "pages/_app.tsx",
      "<NextNProgress />",
      "<Component {...pageProps} />",
      { before: true }
    );
  },
};
