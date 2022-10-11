import { patching } from './patching';

function injectImports(
  filename: string,
  importString: string
): Promise<string | boolean> {
  return patching.prepend(filename, importString);
}

export { injectImports };
