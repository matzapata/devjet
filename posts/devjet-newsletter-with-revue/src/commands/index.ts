module.exports = {
  description: "Create a newsletter component with revue",
  run: async (toolbox) => {
    const { stack } = toolbox.context;

    if (stack === "react") {
      toolbox.template.generate({
        template: "Newsletter.tsx",
        target: "src/components/Newsletter.tsx",
      });
    } else if (stack === "nextjs") {
      toolbox.template.generate({
        template: "Newsletter.tsx",
        target: "components/Newsletter.tsx",
      });
    }

    toolbox.print.warning(
      "Remember to update the username in your form action url"
    );
  },
};
