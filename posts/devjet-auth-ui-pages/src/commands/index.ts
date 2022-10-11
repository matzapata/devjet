module.exports = {
  description:
    "Create authentication pages ui components. Signin, Signup and Recover",
  run: async (toolbox: any) => {
    const { stack } = toolbox.context;

    if (stack === "nextjs") {
      await toolbox.template.generateTree({ templateDirectory: "nextjs" });
    } else if (stack === "react") {
      await toolbox.template.generateTree({ templateDirectory: "react" });
    }
  },
};
