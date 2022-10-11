import { system } from './system';

const concatPackages = (packageName) =>
  Array.isArray(packageName) ? packageName.join(' ') : packageName;

const add = async (
  packageName: string | string[],
  options?: { dev?: boolean; dir?: string; dryRun?: boolean }
): Promise<{ success: boolean; command: string; stdout: string }> => {
  const folder = options.dir ? options.dir : '.';

  const command = `npm install --prefix ${folder} ${
    options.dev && '--save-dev '
  }${concatPackages(packageName)}`;
  let stdout;
  if (!options.dryRun) {
    stdout = await system.run(command);
  }
  return { success: true, command, stdout };
};

const remove = async (
  packageName: string | string[],
  options?: { dev?: boolean; dir?: string; dryRun?: boolean }
): Promise<{ success: boolean; command: string; stdout: string }> => {
  const folder = options.dir ? options.dir : '.';
  const command = `npm uninstall --prefix ${folder} ${concatPackages(
    packageName
  )}`;
  let stdout;
  if (!options.dryRun) {
    stdout = await system.run(command);
  }
  return { success: true, command, stdout };
};

const packageManager = {
  add,
  remove,
};

export { packageManager };
