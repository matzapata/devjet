import { GluegunToolbox } from "gluegun";

module.exports = {
  description:
    "Create SignIn, SignUp and Recovery pages and connect them with supabase to authenticate your users.",
  run: async (toolbox: GluegunToolbox) => {
    await toolbox.step("1. Install dependencies", {
      react: () =>
        toolbox.packageManager.add("@supabase/supabase-js@^1.35.6", {
          dryRun: true,
        }),
    });

    await toolbox.step("2. Update environment variables", {
      react: async () => {
        let success;
        success = await toolbox.patching.append(
          ".env",
          `REACT_APP_SUPABASE_URL= # YOUR_SUPABASE_URL
        REACT_APP_SUPABASE_API_KEY= # YOUR_SUPABASE_API_KEY`
        );
        if (success === false) throw new Error("Error updating .env");

        success = await toolbox.patching.append(
          ".env.local",
          `REACT_APP_SUPABASE_URL= # YOUR_SUPABASE_URL
          REACT_APP_SUPABASE_API_KEY= # YOUR_SUPABASE_API_KEY`
        );
        if (success === false) throw new Error("Error updating .env.local");

        toolbox.print.warning(
          "Remember to complete only `.env` with your supabase credentials"
        );
      },
    });

    await toolbox.step("3. Create supabase client util", {
      react: () =>
        toolbox.template.generate({
          template: "react-supabase-auth/supabase.ts.ejs",
          target: "src/utils/supabase.ts",
        }),
    });

    await toolbox.step("4. Create supabase auth hook", {
      react: () =>
        toolbox.template.generate({
          template: "react-supabase-auth/authHook.tsx.ejs",
          target: "src/hooks/authHook.tsx",
        }),
    });

    await toolbox.step("5. Add your context provider to `src/index.ts`", {
      react: async () => {
        let success;
        success = await toolbox.patching.patch("src/index.ts", {
          insert: "<AuthProvider>",
          after: "<Provider store={store}>",
        });
        if (success === false) throw new Error("Error updating src/index.ts");

        success = await toolbox.patching.patch("src/index.ts", {
          insert: "</AuthProvider>",
          after: "</Provider>",
        });
        if (success === false) throw new Error("Error updating src/index.ts");
      },
    });

    await toolbox.step("6. Create authentication pages", {
      react: async () => {
        await toolbox.template.generate({
          template: "react-supabase-auth/Signup.tsx.ejs",
          target: "src/pages/auth/Signup.tsx",
        });
        await toolbox.template.generate({
          template: "react-supabase-auth/Signin.tsx.ejs",
          target: "src/pages/auth/Signin.tsx",
        });
        await toolbox.template.generate({
          template: "react-supabase-auth/Recover.tsx.ejs",
          target: "src/pages/auth/Recover.tsx",
        });
      },
    });

    await toolbox.step("7. Register the authentication routes", {
      react: async () => {
        let success;

        success = await toolbox.patching.patch("src/index.ts", {
          insert: `import SignUp from "pages/auth/Signup";\nimport SignIn from "pages/auth/Signin";\nimport Recover from "pages/auth/Recover";`,
          before: "\nfunction App() {",
        });
        if (success === false) throw new Error("Error updating src/index.ts");

        success = await toolbox.patching.patch("src/index.ts", {
          insert: `<Route path="/auth/signup" element={<SignUp />} />\n<Route path="/auth/signin" element={<SignIn />} />\n<Route path="/auth/recover" element={<Recover />} />`,
          before: "\nfunction App() {",
        });
        if (success === false) throw new Error("Error updating src/index.ts");
      },
    });

    await toolbox.step("EXTRA. Linting and formating", {
      react: () => toolbox.system.run("npm run lint:fix"),
    });
  },
};
