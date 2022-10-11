module.exports = {
  description: "Create a newsletter component with revue",
  run: async (toolbox) => {
    const { stack } = toolbox.context;

    if (stack === "react") {
      await toolbox.template.generate({
        template: "Newsletter.tsx",
        target: "src/components/Newsletter.tsx",
      });
    } else if (stack === "nextjs") {
      await toolbox.template.generate({
        template: "Newsletter.tsx",
        target: "components/Newsletter.tsx",
      });
    }
  },
};
