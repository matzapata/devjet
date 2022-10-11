import { GluegunToolbox } from "gluegun";

module.exports = {
  description:
    "Create SignIn, SignUp and Recovery pages and connect them with supabase to authenticate your users.",
  run: async (toolbox: GluegunToolbox) => {
    await toolbox.extendPackage({
      dependencies: {
        "@supabase/supabase-js": "^1.35.6",
      },
    });

    await toolbox.patching.append(
      ".env",
      `REACT_APP_SUPABASE_URL= # YOUR_SUPABASE_URL
        REACT_APP_SUPABASE_API_KEY= # YOUR_SUPABASE_API_KEY`
    );
    await toolbox.patching.append(
      ".env.local",
      `REACT_APP_SUPABASE_URL= # YOUR_SUPABASE_URL
          REACT_APP_SUPABASE_API_KEY= # YOUR_SUPABASE_API_KEY`
    );
    await toolbox.patching.patch("src/index.ts", {
      insert: "<AuthProvider>",
      after: "<Provider store={store}>",
    });
    await toolbox.patching.patch("src/index.ts", {
      insert: "</AuthProvider>",
      after: "</Provider>",
    });
    await toolbox.patching.patch("src/index.ts", {
      insert: `import SignUp from "pages/auth/Signup";\nimport SignIn from "pages/auth/Signin";\nimport Recover from "pages/auth/Recover";`,
      before: "\nfunction App() {",
    });
    await toolbox.patching.patch("src/index.ts", {
      insert: `<Route path="/auth/signup" element={<SignUp />} />\n<Route path="/auth/signin" element={<SignIn />} />\n<Route path="/auth/recover" element={<Recover />} />`,
      before: "\nfunction App() {",
    });

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
    await toolbox.template.generate({
      template: "react-supabase-auth/supabase.ts.ejs",
      target: "src/utils/supabase.ts",
    });
    await toolbox.template.generate({
      template: "react-supabase-auth/authHook.tsx.ejs",
      target: "src/hooks/authHook.tsx",
    });
  },
};
