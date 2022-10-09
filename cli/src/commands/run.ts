import { filesystem, GluegunToolbox } from 'gluegun';
import findGitRoot from 'find-git-root';
import { GeneratorToolbox } from '../types';
import merge from 'deepmerge';

function getProjectStack(toolbox: GluegunToolbox, root: string) {
  const { filesystem } = toolbox;

  const isNextjs = filesystem.exists(filesystem.path(root, 'next.config.js'));
  const isReact = filesystem.exists(filesystem.path(root, 'src', 'index.tsx'));

  if (isNextjs) return 'nextjs';
  else if (isReact) return 'react';
  else return null;
}

function findProjectRoot() {
  return findGitRoot(process.cwd()).replace('/.git', '').replace('\\.git', '');
}

async function runGenerator(
  toolbox: GluegunToolbox,
  context: {
    stack: string;
    root: string;
  },
  generatorFolder: string,
  command: string
) {
  const generatorToolbox: GeneratorToolbox = {
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
    packageManager: toolbox.packageManager,
    template: {
      generate: async ({ template, target, props, directory }) => {
        const retVal = toolbox.template.generate({
          directory: directory
            ? directory
            : toolbox.filesystem.path(generatorFolder, 'build', 'templates'),
          template,
          target,
          props,
        });
        toolbox.print.muted(`Generated ${target}`);
        return retVal;
      },
      renderTree: async ({ srcFolder, props }) => {
        const getNodeFiles = (node, files = []) => {
          if (node.type === 'file') files.push(node.relativePath);
          else {
            for (const children of node.children) {
              files.push(...getNodeFiles(children));
            }
          }
          return files;
        };
        const srcDirectory = toolbox.filesystem.path(
          generatorFolder,
          'build',
          'templates',
          srcFolder
        );
        const tree = toolbox.filesystem.inspectTree(srcDirectory, {
          relativePath: true,
        });

        const files = getNodeFiles(tree);
        for (const file of files) {
          await toolbox.template.generate({
            directory: srcDirectory,
            template: file.replace('./', ''),
            target: file.replace('./', ''),
            props,
          });
          toolbox.print.muted(`Generated ${file.replace('./', '')}`);
        }
      },
    },
    extendPackage: (props) => {
      return toolbox.patching.update('package.json', (pkg) => {
        return merge(pkg, props);
      });
    },
    injectImports: (filename, importString) => {
      return toolbox.patching.prepend(filename, importString);
    },
    step: async (message, action) => {
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
    'We strongly recommend to run devjet generators on a new branch or with a previous commit so you can review the changes applied. Are you ready to continue?'
  );
  if (!isReady) return toolbox.print.error('Take your time, no problem!');

  toolbox.print.warning(
    'Hey, if you changed the default folder structure, some things may break...\n'
  );

  const commandPath = toolbox.filesystem.path(
    generatorFolder,
    'build',
    'commands',
    `${command}.js`
  );

  const generator = await import(commandPath);
  if (generator) {
    await generator.run(generatorToolbox);
    toolbox.print.info(
      'Please follow instruction at usedevjet.com on how to use this generator'
    );
  } else
    toolbox.print.error('Auchh, it seams like that command does not exist');

  return null;
}

module.exports = {
  name: 'run',
  description: `Run devjet generators. Usage: devjet run generator-package generator-name. Discover generators at usedevjet.com`,
  run: async (toolbox: GluegunToolbox) => {
    const { print, parameters } = toolbox;
    const helpMessage = 'Usage: devjet run generatorname commandname';

    // npx devjet run generatorname commandname
    const dev = parameters.options.dev;
    const generatorName = `devjet-${parameters.first}`;
    const commandName = parameters.second ? parameters.second : 'index';
    if (!generatorName) return toolbox.print.error(helpMessage);

    // Check techstack and cd to root dir. Create context
    const root = findProjectRoot();
    if (root === '') return print.error('Not a devjet project');
    else print.info(`Found devjet project at ${root}`);

    const stack = getProjectStack(toolbox, root);
    if (!stack) return print.error("Couldn't recognize tech stack");
    else print.info(`Great! it seams you are working with ${stack}`);

    // Install generatorName
    if (dev) {
      print.warning(
        '\nYou are in dev mode, meaning you will have to install and uninstall the generator package yourself. Use npm install ../path/to/package or npm link\n'
      );
    } else {
      const generatorInstallSpinner = toolbox.print.spin(
        'Installing generator...'
      );
      generatorInstallSpinner.start();
      const generatorPackage = await toolbox.packageManager.add(generatorName, {
        dev: true,
      });
      if (!generatorPackage.success) {
        return generatorInstallSpinner.fail("Couldn't install the generator");
      }
      generatorInstallSpinner.info('Generator installed successfully');
    }

    const generatorPath = filesystem.path('.', 'node_modules', generatorName);
    await runGenerator(toolbox, { stack, root }, generatorPath, commandName);

    // Prompt for uninstall
    if (!dev) {
      const generatorRemoveSpinner = toolbox.print.spin(
        'Removing generator package'
      );
      generatorRemoveSpinner.start();
      await toolbox.packageManager.remove(generatorName, { dryRun: false });
      generatorRemoveSpinner.succeed('Generator removed successfully');
    }

    print.success(`${print.checkmark} All done!`);
  },
};
