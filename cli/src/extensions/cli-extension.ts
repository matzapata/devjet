import { GluegunToolbox } from 'gluegun';

// add your CLI-specific functionality here, which will then be accessible
// to your commands
module.exports = (toolbox: GluegunToolbox) => {
  toolbox.step = async (
    toolbox: GluegunToolbox,
    message: string,
    stack: string,
    action: {
      all?: () => Promise<any>;
      react?: () => Promise<any>;
      pern?: () => Promise<any>;
      nextjs?: () => Promise<any>;
    }
  ): Promise<void> => {
    try {
      if (action.all !== undefined) await action.all();
      if (action[stack] !== undefined) await action[stack]();

      toolbox.print.success(`${toolbox.print.checkmark} ${message}`);
    } catch (e) {
      toolbox.print.error(`${toolbox.print.xmark}  ${message}`);
      toolbox.print.error(`Error message: ${e.message}`);
    }
  };

  // enable this if you want to read configuration in from
  // the current folder's package.json (in a "cli" property),
  // cli.config.json, etc.
  // toolbox.config = {
  //   ...toolbox.config,
  //   ...toolbox.config.loadConfig("cli", process.cwd())
  // }
};
