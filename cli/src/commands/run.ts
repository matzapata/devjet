import { GluegunToolbox } from 'gluegun';
import findGitRoot from 'find-git-root';

function getProjectStack(toolbox: GluegunToolbox, root: string) {
  const { filesystem } = toolbox;

  const isNextjs = filesystem.exists(filesystem.path(root, 'next.config'));
  const isReact = filesystem.exists(filesystem.path(root, 'src', 'index.tsx'));
  const isPern = filesystem.exists(
    filesystem.path(root, 'client', 'src', 'index.tsx')
  );

  if (isNextjs) return 'nextjs';
  else if (isPern) return 'pern';
  else if (isReact) return 'react';
  else return null;
}

function findProjectRoot() {
  return findGitRoot(process.cwd()).replace('/.git', '').replace('\\.git', '');
}

// function printCommands(toolbox: GluegunToolbox, commands: GluegunCommand[]) {
//   commands.forEach((command) =>
//     toolbox.print.info(`  ${command.name} - ${command.description}`)
//   );
// }

// async function runPlugin(toolbox, pluginName, commandName) {
//   console.log(pluginName, commandName);
//   const runner = build().plugin(`./node_modules/${pluginName}`).create();
//   console.log(runner);
//   const res = await runner.run(commandName);
//   console.log(res);
//   return null;
// }

module.exports = {
  name: 'run',
  description: `Bootstrap your Devjet project. Usage: devjet new projectname`,
  run: async (toolbox: GluegunToolbox) => {
    const { print, parameters } = toolbox;
    const helpMessage = 'Usage: devjet run pluginname commandname';

    // npx devjet run pluginname commandname
    const pluginName = parameters.first;
    const commandName = parameters.second;
    if (!pluginName) return toolbox.print.error(helpMessage);
    if (!commandName) return toolbox.print.error(helpMessage);

    // Check techstack and cd to root dir. Create context
    const root = findProjectRoot();
    if (root === '') return print.error('Not a devjet project');
    else print.info(`Found devjet project at ${root}`);

    const stack = getProjectStack(toolbox, root);
    if (!stack) return print.error("Couldn't recognize tech stack");
    else print.info(`Great! it seams you are working with ${stack}`);

    // Install pluginname
    const pluginInstallSpinner = toolbox.print.spin(
      'Installing plugin package'
    );
    pluginInstallSpinner.start();
    const pluginPackage = await toolbox.packageManager.add(pluginName, {
      dev: true,
    });
    if (!pluginPackage.success) {
      return pluginInstallSpinner.fail("Couldn't install plugin");
    }
    pluginInstallSpinner.succeed('Plugin installed');

    // await runPlugin(toolbox, pluginName, commandName);
    toolbox.runtime.addPlugin(`./node_modules/${pluginName}`);
    await toolbox.runtime.run(commandName);

    // Prompt for uninstall
    // const removePlugin = await prompt.confirm(
    //   'Would you like to remove the plugin (recommended if one time)',
    //   true
    // );
    // if (removePlugin) {
    //   const pluginRemoveSpinner = toolbox.print.spin('Removing plugin package');
    //   pluginRemoveSpinner.start();
    //   await toolbox.packageManager.remove(pluginName, { dryRun: false });
    //   pluginRemoveSpinner.succeed('Plugin removed successfully');
    // }

    // return print.success(`${print.checkmark} All done!`);
  },
};
