import { GluegunToolbox } from "gluegun";

async function step(
  toolbox: GluegunToolbox,
  message: string,
  stack: string,
  action: {
    all?: () => Promise<any>;
    react?: () => Promise<any>;
    pern?: () => Promise<any>;
    nextjs?: () => Promise<any>;
  }
) {
  try {
    if (action.all !== undefined) await action.all();
    if (action[stack] !== undefined) await action[stack]();

    toolbox.print.success(`✅ ${message}`);
  } catch (e) {
    toolbox.print.error(`❌ ${message}`);
    toolbox.print.error(e.message);
  }
}

module.exports = {
  name: "pern_react-supabase-auth-hook",
  description: "Add authentication with supabase to your pern project",
  run: async (toolbox: GluegunToolbox) => {
    const { stack } = await toolbox.prompt.ask({
      type: "select",
      name: "stack",
      message: "Wich stack are you working with?",
      choices: ["react", "nextjs", "pern", "other"],
    });

    const isAtRoot = await toolbox.prompt.confirm(
      "Please confirm that you are at the root folder of your project (a small help, is the folder that contains the .git folder!)"
    );
    if (!isAtRoot)
      return toolbox.print.error(
        "Auchh, we cant resolve that yet, please move to the root folder and run this plugin again!"
      );
    const isReady = await toolbox.prompt.confirm(
      "We strongly recommend to run devjet generators on a new branch or with a previous commit. Are you ready to continue?"
    );
    if (!isReady)
      return toolbox.print.error("Heyy, take your time, no problem!");

    toolbox.print.info(
      "Hey, if you changed the default folder structure, some things may break, just a small disclosure..."
    );

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

    if (stack === "react") {
      // Add dependencies to package.json
      // await toolbox.patching.update('package.json', (pkg) => {
      //     pkg.dependencies["@supabase/supabase-js"] = "^1.35.6"
      //     return pkg;
      // })
      // toolbox.print.success("✅ 1. Added dependencies to package.json")

      // 2. Create your supabase application and copy your credentials to `client/.env`. Remember to update `.env.example` with your new enviroment variable
      // await toolbox.patching.append('.env', 'REACT_APP_SUPABASE_URL=\nREACT_APP_SUPABASE_API_KEY=\n')
      // toolbox.print.success("✅ 2. Append env variables to .env")

      await toolbox.patching.append(
        ".env.example",
        "REACT_APP_SUPABASE_URL=\nREACT_APP_SUPABASE_API_KEY=\n"
      );
      toolbox.print.success("✅ 2. Update .env.example");

      // 3. Create supabase client in `client/src/utils/supabase.ts`
      await toolbox.template.generate({
        template: "supabase.ts",
        target: `src/utils/supabase.ts`,
      });
      toolbox.print.success("✅ 3. Create supabase client");

      // 4. Create an authentication context hook
      await toolbox.template.generate({
        template: "authHook.tsx",
        target: `src/utils/authHook.tsx`,
      });
      toolbox.print.success("✅ 4. Create Authentication hook");

      // 5. Add your context provider to `client/src/index.ts`
      await toolbox.patching.patch("./src/index.tsx", {
        insert: 'import { AuthProvider } from "utils/authHook";',
        after: 'import chakraTheme from "utils/chakraTheme";',
      });
      await toolbox.patching.patch("./src/index.tsx", {
        insert: "<AuthProvider>",
        after: "<Provider store={store}>",
      });
      await toolbox.patching.patch("./src/index.tsx", {
        insert: "</AuthProvider>",
        before: "</AuthProvider>",
      });
      toolbox.print.success("✅ 5. Add context provider to index.tsx");

      toolbox.print.success("All done!!");
    } else if (stack === "pern") {
    } else if (stack === "nextjs") {
    } else
      toolbox.print.error("Sorry, we don't have support for that one yet!");
  },
};
