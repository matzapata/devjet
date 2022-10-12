import { patching } from './patching';

function injectImports(filename: string, importStrings: string[]): void {
  patching.prependManyLines(filename, importStrings);
}

type InjectImports = typeof injectImports;

export { injectImports, InjectImports };
