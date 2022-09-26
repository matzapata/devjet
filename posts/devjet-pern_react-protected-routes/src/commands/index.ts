import { GluegunToolbox } from "gluegun";
import getContext from "../lib/context";
import step from "../lib/step";

module.exports = {
  name: "add-protected-routes",
  description: "Create protected route component",
  run: async (toolbox: GluegunToolbox) => {
    const { stack } = await getContext(toolbox);

    await step(toolbox, "1. Create ProtectedRoute component", stack, {
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

    toolbox.print.success("All done!!");
  },
};
