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
    await toolbox.patching.patch("src/App.tsx", {
      insert: `import ${name} from "pages/${name}";\n`,
      before: `function App() {`,
    });
    await toolbox.patching.patch("src/App.tsx", {
      insert: `<Route path="${path}" element={<${name} />} />`,
      after: `<Routes>\n`,
    });
  },
};
