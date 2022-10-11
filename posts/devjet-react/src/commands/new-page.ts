module.exports = {
  description: "Create a new react-router-dom page.",
  run: async (toolbox) => {
    if (toolbox.context.stack === "nextjs") {
      return toolbox.print.error(
        "This generator is not available for nextjs yet."
      );
    }

    const { name, path } = await toolbox.prompt.ask([
      {
        type: "input",
        name: "name",
        message: "Input component name",
      },
      {
        type: "input",
        name: "path",
        message: "Input route path",
      },
    ]);

    await toolbox.template.generate({
      template: "create-react-router-routes/Page.tsx.ejs",
      target: `src/pages/${name}.tsx`,
      props: { name },
    });

    await toolbox.patching.patch([
      {
        filename: "src/App.tsx",
        opts: {
          insert: `import ${name} from "pages/${name}";\n`,
          before: `function App() {`,
        },
      },
      {
        filename: "src/App.tsx",
        opts: {
          insert: `<Route path="${path}" element={<${name} />} />`,
          after: `<Routes>\n`,
        },
      },
    ]);
  },
};
