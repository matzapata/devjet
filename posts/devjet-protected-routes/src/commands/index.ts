import { GeneratorToolbox } from "devjet";

module.exports = {
  description: "Create protected route component",
  run: async (toolbox: GeneratorToolbox) => {
    const { stack } = toolbox.context;

    if (stack === "nextjs") {
      return toolbox.print.error(
        "Sorry, this generator is only available for react"
      );
    }

    await toolbox.template.generate({
      template: "ProtectedRoute.tsx",
      target: "src/components/ProtectedRoute.tsx",
    });
  },
};
