import { GluegunToolbox } from "gluegun";

module.exports = {
  description:
    "Create a new react-router-dom page. Usage: devjet run react new-page --name=PageName --path=page-path",
  run: async (toolbox: GluegunToolbox) => {
    const { name, path } = toolbox.parameters.options;

    await toolbox.step("1. Create page component at src/pages", {
      react: () =>
        toolbox.template.generate({
          template: "create-react-router-routes/Page.tsx.ejs",
          target: `src/pages/${name}.tsx`,
        }),
    });

    await toolbox.step("2. Register route at src/App.tsx ", {
      react: async () => {
        await toolbox.patching.patch("src/App.tsx", {
          insert: `import ${name} from "pages/${name}";\n`,
          before: `function App() {`,
        });
        await toolbox.patching.patch("src/App.tsx", {
          insert: `<Route path="${path}" element={<${name} />} />`,
          after: `<Routes>\n`,
        });
      },
    });

    toolbox.print.warning(
      "Remember to format the documents changed and review the order of the routes declaration."
    );
  },
};
