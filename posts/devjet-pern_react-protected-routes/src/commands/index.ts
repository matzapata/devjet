import { GluegunToolbox } from "gluegun";

module.exports = {
  description: "Create protected route component",
  run: async (toolbox: GluegunToolbox) => {
    await toolbox.step("1. Create ProtectedRoute component", {
      react: () =>
        toolbox.template.generate({
          template: "ProtectedRoute.tsx",
          target: "src/components/ProtectedRoute.tsx",
        }),
      pern: () =>
        toolbox.template.generate({
          template: "ProtectedRoute.tsx",
          target: "client/src/components/ProtectedRoute.tsx",
        }),
    });
  },
};
