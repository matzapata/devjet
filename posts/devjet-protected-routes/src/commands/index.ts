module.exports = {
  description: "Create protected route component",
  run: async (toolbox) => {
    const { stack } = toolbox.context;

    if (stack === "nextjs") {
      return toolbox.print("Sorry, this generator is only available for react");
    }

    await toolbox.template.generate({
      template: "ProtectedRoute.tsx",
      target: "src/components/ProtectedRoute.tsx",
    });
  },
};
