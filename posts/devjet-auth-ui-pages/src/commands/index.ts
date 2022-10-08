import { GluegunToolbox } from "gluegun";

module.exports = {
  description:
    "Create authentication pages ui components. Signin, Signup and Recover",
  run: async (toolbox: GluegunToolbox) => {
    await toolbox.step(
      "1. Create the auth pages components in the pages folder",
      {
        react: async () => {
          await Promise.all([
            toolbox.template.generate({
              template: "Signin.tsx.ejs",
              target: "src/pages/Signin.tsx",
            }),
            toolbox.template.generate({
              template: "Signup.tsx.ejs",
              target: "src/pages/Signup.tsx",
            }),
            toolbox.template.generate({
              template: "Recover.tsx.ejs",
              target: "src/pages/Recover.tsx",
            }),
          ]);
          toolbox.print.warning(
            "You'll have to update App.tsx to render these components as pages"
          );
        },
        nextjs: () =>
          Promise.all([
            toolbox.template.generate({
              template: "Signin.tsx.ejs",
              target: "src/pages/Signin.tsx",
            }),
            toolbox.template.generate({
              template: "Signup.tsx.ejs",
              target: "src/pages/Signup.tsx",
            }),
            toolbox.template.generate({
              template: "Recover.tsx.ejs",
              target: "src/pages/Recover.tsx",
            }),
          ]),
      }
    );
  },
};
