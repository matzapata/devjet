import { GeneratorToolbox } from "devjet";

async function NextjsGenerator(toolbox: GeneratorToolbox) {
  await toolbox.extendPackage({
    dependencies: {
      "@supabase/supabase-js": "^1.35.6",
      "@supabase/auth-helpers-nextjs": "^0.2.7",
      "@supabase/auth-helpers-react": "^0.2.3",
    },
  });

  toolbox.patching.appendManyLines(".env.local", [
    "NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key",
  ]);
  toolbox.patching.appendManyLines(".env.local.example", [
    "NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key",
  ]);

  toolbox.patching.insertLine(
    "pages/_app.tsx",
    "<UserProvider supabaseClient={supabaseClient}>",
    "<Component {...pageProps} />",
    { before: true }
  );
  toolbox.patching.insertLine(
    "pages/_app.tsx",
    "</UserProvider>",
    /<Component {...pageProps} \/>/g,
    { after: true }
  );

  toolbox.injectImports("pages/_app.tsx", [
    'import { UserProvider } from "@supabase/auth-helpers-react";',
    'import { supabaseClient } from "@supabase/auth-helpers-nextjs";',
  ]);

  await toolbox.template.generateTree({
    templateDirectory: "nextjs-supabase-auth",
  });
}

async function ReactjsGenerator(toolbox: GeneratorToolbox) {
  await toolbox.extendPackage({
    dependencies: {
      "@supabase/supabase-js": "^1.35.6",
    },
  });

  toolbox.patching.appendManyLines(".env", [
    "REACT_APP_SUPABASE_URL= # YOUR_SUPABASE_URL",
    "REACT_APP_SUPABASE_API_KEY= # YOUR_SUPABASE_API_KEY",
  ]);
  toolbox.patching.appendManyLines(".env.example", [
    "REACT_APP_SUPABASE_URL= # YOUR_SUPABASE_URL",
    "REACT_APP_SUPABASE_API_KEY= # YOUR_SUPABASE_API_KEY",
  ]);

  toolbox.patching.insertLine(
    "src/index.tsx",
    "<AuthProvider>",
    "<Provider store={store}>",
    { after: true }
  );
  toolbox.patching.insertLine(
    "src/index.tsx",
    "</AuthProvider>",
    "</Provider>",
    { after: true }
  );
  toolbox.patching.insertLine(
    "src/index.tsx",
    `<Route path="/auth/signup" element={<SignUp />} />\n<Route path="/auth/signin" element={<SignIn />} />\n<Route path="/auth/recover" element={<Recover />} />`,
    "function App() {",
    { before: true }
  );

  toolbox.injectImports("src/index.tsx", [
    `import SignUp from "pages/auth/Signup";`,
    `import SignIn from "pages/auth/Signin";`,
    `import Recover from "pages/auth/Recover";`,
  ]);

  await toolbox.template.generateTree({
    templateDirectory: "react-supabase-auth",
  });
}

module.exports = {
  description:
    "Create SignIn, SignUp and Recovery pages and connect them with supabase to authenticate your users.",
  run: async (toolbox: GeneratorToolbox) => {
    if (toolbox.context.stack === "nextjs") await NextjsGenerator(toolbox);
    else await ReactjsGenerator(toolbox);
  },
};
