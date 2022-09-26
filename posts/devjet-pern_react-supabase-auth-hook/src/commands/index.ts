import { GluegunToolbox } from "gluegun";
import getContext from "../lib/context";
import step from "../lib/step";

module.exports = {
  name: "supabase-auth-hook",
  description: "Add authentication with supabase to your pern project",
  run: async (toolbox: GluegunToolbox) => {
    const { stack } = await getContext(toolbox);

    await step(toolbox, "1. Add dependencies to package.json", stack, {
      react: () =>
        toolbox.patching.update("package.json", (pkg) => {
          pkg.dependencies["@supabase/supabase-js"] = "^1.35.6";
          return pkg;
        }),
      pern: () =>
        toolbox.patching.update("client/package.json", (pkg) => {
          pkg.dependencies["@supabase/supabase-js"] = "^1.35.6";
          return pkg;
        }),
    });

    await step(toolbox, "2. Append env variables to .env", stack, {
      react: () =>
        toolbox.patching.append(
          ".env",
          "REACT_APP_SUPABASE_URL=\nREACT_APP_SUPABASE_API_KEY=\n"
        ),
      pern: () =>
        toolbox.patching.append(
          "client/.env",
          "REACT_APP_SUPABASE_URL=\nREACT_APP_SUPABASE_API_KEY=\n"
        ),
    });

    await step(toolbox, "3. Update .env.example", stack, {
      react: () =>
        toolbox.patching.append(
          ".env.example",
          "REACT_APP_SUPABASE_URL=\nREACT_APP_SUPABASE_API_KEY=\n"
        ),
      pern: () =>
        toolbox.patching.append(
          "client/.env.example",
          "REACT_APP_SUPABASE_URL=\nREACT_APP_SUPABASE_API_KEY=\n"
        ),
    });

    await step(toolbox, "4. Create supabase client", stack, {
      react: () =>
        toolbox.template.generate({
          template: "supabase.ts",
          target: `src/utils/supabase.ts`,
        }),
      pern: () =>
        toolbox.template.generate({
          template: "supabase.ts",
          target: `client/src/utils/supabase.ts`,
        }),
    });

    await step(toolbox, "5. Create Authentication hook", stack, {
      react: () =>
        toolbox.template.generate({
          template: "authHook.tsx",
          target: `src/utils/authHook.tsx`,
        }),
      pern: () =>
        toolbox.template.generate({
          template: "authHook.tsx",
          target: `client/src/utils/authHook.tsx`,
        }),
    });

    await step(toolbox, "6. Add context provider to index.tsx", stack, {
      react: async () => {
        await toolbox.patching.patch("src/index.tsx", {
          insert: 'import { AuthProvider } from "utils/authHook";',
          after: 'import chakraTheme from "utils/chakraTheme";',
        });
        await toolbox.patching.patch("src/index.tsx", {
          insert: "<AuthProider>",
          after: "<Provider store={store}>",
        });
        await toolbox.patching.patch("src/index.tsx", {
          insert: "</AuthProvider>",
          before: "</AuthProvider>",
        });
      },
      pern: async () => {
        await toolbox.patching.patch("client/src/index.tsx", {
          insert: 'import { AuthProvider } from "utils/authHook";',
          after: 'import chakraTheme from "utils/chakraTheme";',
        });
        await toolbox.patching.patch("client/src/index.tsx", {
          insert: "<AuthProider>",
          after: "<Provider store={store}>",
        });
        await toolbox.patching.patch("client/src/index.tsx", {
          insert: "</AuthProvider>",
          before: "</AuthProvider>",
        });
      },
    });

    toolbox.print.success("All done!!");
  },
};
