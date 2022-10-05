import { filesystem, GluegunToolbox } from 'gluegun';
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

async function runPlugin(
  toolbox: GluegunToolbox,
  context: {
    stack: string;
    root: string;
  },
  pluginFolder: string,
  command: string
) {
  const pluginToolbox = {
    context,
    parameters: toolbox.parameters,
    filesystem: toolbox.filesystem,
    http: toolbox.http,
    meta: toolbox.meta,
    patching: toolbox.patching,
    print: toolbox.print,
    prompt: toolbox.prompt,
    semver: toolbox.semver,
    strings: toolbox.strings,
    system: toolbox.system,
    template: {
      generate: ({
        template,
        target,
        props,
        directory,
      }: {
        template: string;
        target: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        props?: any;
        directory?: string;
      }) => {
        toolbox.template.generate({
          directory: directory
            ? directory
            : toolbox.filesystem.path(pluginFolder, 'build', 'templates'),
          template,
          target,
          props,
        });
      },
    },
    packageManager: toolbox.packageManager,
    step: async (
      message: string,
      action?: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        all?: () => Promise<any>;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        react?: () => Promise<any>;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        pern?: () => Promise<any>;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        nextjs?: () => Promise<any>;
      }
    ): Promise<void> => {
      try {
        if (action === undefined) {
          return toolbox.print.success(`${toolbox.print.checkmark} ${message}`);
        }

        if (action.all !== undefined) await action.all();
        if (action[context.stack] !== undefined) await action[context.stack]();
        toolbox.print.success(`${toolbox.print.checkmark} ${message}`);
      } catch (e) {
        toolbox.print.error(`${toolbox.print.xmark}  ${message}`);
        toolbox.print.error(`Error message: ${e.message}`);
      }
    },
  };

  const isReady = await toolbox.prompt.confirm(
    'We strongly recommend to run devjet generators on a new branch or with a previous commit. Are you ready to continue?'
  );
  if (!isReady) return toolbox.print.error('Take your time, no problem!');

  toolbox.print.warning(
    'Hey, if you changed the default folder structure, some things may break...\n'
  );

  const commandPath = toolbox.filesystem.path(
    pluginFolder,
    'build',
    'commands',
    `${command}.js`
  );

  const plugin = await import(commandPath);
  if (plugin) await plugin.run(pluginToolbox);
  else toolbox.print.error('Auchh, it seams like that command does not exist');

  return null;
}

module.exports = {
  name: 'run',
  description: `Bootstrap your Devjet project. Usage: devjet new projectname`,
  run: async (toolbox: GluegunToolbox) => {
    const { print, parameters, prompt } = toolbox;
    const helpMessage = 'Usage: devjet run pluginname commandname';

    // npx devjet run pluginname commandname
    const dev = parameters.options.dev;
    const pluginName = `devjet-${parameters.first}`;
    const commandName = parameters.second ? parameters.second : 'index';
    if (!pluginName) return toolbox.print.error(helpMessage);

    // Check techstack and cd to root dir. Create context
    const root = findProjectRoot();
    if (root === '') return print.error('Not a devjet project');
    else print.info(`Found devjet project at ${root}`);

    const stack = getProjectStack(toolbox, root);
    if (!stack) return print.error("Couldn't recognize tech stack");
    else print.info(`Great! it seams you are working with ${stack}`);

    // Install pluginname
    if (dev) {
      print.warning(
        '\nYou are in dev mode, meaning you will have to install and uninstall the plugin package yourself. Use npm install ../path/to/package or npm link\n'
      );
    } else {
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
    }

    const pluginPath = filesystem.path('.', 'node_modules', pluginName);
    await runPlugin(toolbox, { stack, root }, pluginPath, commandName);

    // Prompt for uninstall
    if (!dev) {
      const pluginRemoveSpinner = toolbox.print.spin('Removing plugin package');
      pluginRemoveSpinner.start();
      await toolbox.packageManager.remove(pluginName, { dryRun: false });
      pluginRemoveSpinner.succeed('Plugin removed successfully');
    }

    return print.success(`${print.checkmark} All done!`);
  },
};
