import { GluegunToolbox } from "gluegun";

module.exports = {
  description: "Add authentication with supabase to your pern project",
  run: async (toolbox: GluegunToolbox) => {
    await toolbox.step("1. Add dependencies to package.json", {
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

    await toolbox.step("2. Append env variables to .env", {
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

    await toolbox.step("3. Update .env.example", {
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

    await toolbox.step("4. Create supabase client", {
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

    await toolbox.step("5. Create Authentication hook", {
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

    await toolbox.step(toolbox, "6. Add context provider to index.tsx", {
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
  },
};
