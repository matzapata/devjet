import { print } from '../lib/toolbox/print';
import { filesystem } from '../lib/toolbox/filesystem';
import getProjectRoot from '../lib/getProjectRoot';
import getProjectStack from '../lib/getProjectStack';
import runGenerator from '../lib/runGenerator';
import { packageManager } from '../lib/toolbox/packageManager';
import { execSync } from 'child_process';
// import { execSync } from 'child_process';

async function runCommand(
  generatorPackage: string,
  isDev: boolean,
  generator?: string
): Promise<unknown> {
  const generatorName = `devjet-${generatorPackage}`;
  const commandName = generator ? generator : 'index';

  // Get project context
  let root = filesystem.cwd();
  let stack = getProjectStack(root);
  if (!stack) {
    root = getProjectRoot();
    if (root === '') return print.error("Could't find a devjet project");
    else print.info(`Found devjet project at ${root}`);
    stack = getProjectStack(root);
    if (!stack) return print.error("Couldn't recognize tech stack");
  } else print.info(`Great! it seams you are working with ${stack}`);

  // Install generatorName
  if (isDev) {
    print.warning(
      '\nYou are in dev mode, meaning you will have to install and uninstall the generator package yourself. Use npm install ../path/to/package or npm link\n'
    );
  } else {
    const generatorInstallSpinner = print.spin('Installing generator...');
    generatorInstallSpinner.start();
    const generatorPackage = await packageManager.add(generatorName, {
      dev: true,
      dryRun: false,
    });
    if (!generatorPackage.success) {
      return generatorInstallSpinner.fail("Couldn't install the generator");
    }
    generatorInstallSpinner.info('Generator installed successfully');
  }

  // Run generator
  const generatorPath = filesystem.path('.', 'node_modules', generatorName);
  await runGenerator({ stack, root }, generatorPath, commandName);

  // Prompt for uninstall
  if (!isDev) {
    const generatorRemoveSpinner = print.spin('Removing generator package');
    generatorRemoveSpinner.start();
    await packageManager.remove(generatorName, { dryRun: false });
    generatorRemoveSpinner.succeed('Generator removed successfully');
  }

  print.info('Installing new dependencies and linting...');
  try {
    execSync('npm install && npm run lint:fix"', {
      stdio: 'inherit',
    });
  } catch (e) {}

  print.info(
    'Please follow instruction at usedevjet.com on how to use the code generated'
  );

  process.exit();
}

export default runCommand;
