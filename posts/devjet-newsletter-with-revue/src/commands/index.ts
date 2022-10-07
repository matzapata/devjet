import { GluegunToolbox } from "gluegun";

module.exports = {
  description: "Create a newsletter component with revue",
  run: async (toolbox: GluegunToolbox) => {
    await toolbox.step(
      "1. Create your account at https://www.getrevue.co/ (This one is on you 😉​)"
    );

    await toolbox.step("2. Create the newsletter component", {
      all: async () =>
        toolbox.print.warning(
          " - Remember to update the username in your form action url"
        ),
      react: () =>
        toolbox.template.generate({
          template: "Newsletter.tsx",
          target: "src/components/Newsletter.tsx",
        }),
      nextjs: () =>
        toolbox.template.generate({
          template: "Newsletter.tsx",
          target: "components/Newsletter.tsx",
        }),
    });
  },
};
