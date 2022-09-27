import { GluegunToolbox } from "gluegun";

const getContext = async (
  toolbox: GluegunToolbox
): Promise<{ stack: string }> => {
  const { stack } = await toolbox.prompt.ask({
    type: "select",
    name: "stack",
    message: "Wich stack are you working with?",
    choices: ["react", "nextjs", "pern", "other"],
  });

  const isAtRoot = await toolbox.prompt.confirm(
    "Please confirm that you are at the root folder of your project (a small help, is the folder that contains the .git folder!)"
  );
  if (!isAtRoot) {
    toolbox.print.error(
      "Auchh, we cant resolve that yet, please move to the root folder and run this plugin again!"
    );
    process.exit();
  }

  const isReady = await toolbox.prompt.confirm(
    "We strongly recommend to run devjet generators on a new branch or with a previous commit. Are you ready to continue?"
  );
  if (!isReady) {
    toolbox.print.error("Heyy, take your time, no problem!");
    process.exit();
  }

  toolbox.print.warning(
    "Hey, if you changed the default folder structure, some things may break, just a small disclosure...\n"
  );

  return {
    stack,
  };
};

export default getContext;
