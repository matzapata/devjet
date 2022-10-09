module.exports = {
  description: "Create protected route component",
  run: async (toolbox) => {
    const { stack } = toolbox.context;

    if (stack === "react") {
      await toolbox.template.generate({
        template: "ProtectedRoute.tsx",
        target: "src/components/ProtectedRoute.tsx",
      });
    } else toolbox.print("Sorry, this generator is only available for react");
  },
};
