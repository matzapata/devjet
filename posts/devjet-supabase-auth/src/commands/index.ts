module.exports = {
  description:
    "Create SignIn, SignUp and Recovery pages and connect them with supabase to authenticate your users.",
  run: async (toolbox) => {
    if (toolbox.context.stack === "nextjs") {
      return toolbox.print.error(
        "This generator is not available for nextjs yet"
      );
    }

    await toolbox.extendPackage({
      dependencies: {
        "@supabase/supabase-js": "^1.35.6",
      },
    });

    await toolbox.patching.append([
      {
        filename: ".env",
        data: `REACT_APP_SUPABASE_URL= # YOUR_SUPABASE_URL
  REACT_APP_SUPABASE_API_KEY= # YOUR_SUPABASE_API_KEY`,
      },
      {
        filename: ".env.local",
        data: `REACT_APP_SUPABASE_URL= # YOUR_SUPABASE_URL
        REACT_APP_SUPABASE_API_KEY= # YOUR_SUPABASE_API_KEY`,
      },
    ]);

    await toolbox.patching.patch([
      {
        filename: "src/index.tsx",
        opts: {
          insert: "<AuthProvider>",
          after: "<Provider store={store}>",
        },
      },
      {
        filename: "src/index.tsx",
        opts: {
          insert: "</AuthProvider>",
          after: "</Provider>",
        },
      },
      {
        filename: "src/index.tsx",
        opts: {
          insert: `<Route path="/auth/signup" element={<SignUp />} />\n<Route path="/auth/signin" element={<SignIn />} />\n<Route path="/auth/recover" element={<Recover />} />`,
          before: "\nfunction App() {",
        },
      },
    ]);

    await toolbox.injectImports(
      "src/index.tsx",
      `import SignUp from "pages/auth/Signup";\nimport SignIn from "pages/auth/Signin";\nimport Recover from "pages/auth/Recover";`
    );

    await toolbox.template.generateTree({
      templateDirectory: "react-supabase-auth",
    });
  },
};
