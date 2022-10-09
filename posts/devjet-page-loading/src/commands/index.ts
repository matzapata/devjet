module.exports = {
  description: 'Add page loading to your nextjs app',
  run: async (toolbox: any) => {
    if (toolbox.context.stack === "nextjs") {
      await toolbox.extendPackage({
        dependencies: {
          "nextjs-progressbar": "^0.0.14",
        }
      })
      await toolbox.injectImports("pages/_app.tsx", `import NextNProgress from "nextjs-progressbar";`)
      await toolbox.patching.patch("pages/_app.tsx", { insert: "<NextNProgress />", before: "<Component {...pageProps} />" })
      toolbox.print.muted("Updated pages/_app.tsx")
    } else toolbox.print.error("Sorry, this generator is only available for nextjs projects")
  },
};
