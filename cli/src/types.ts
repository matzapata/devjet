import { Filesystem } from './lib/toolbox/filesystem';
import { Patching } from './lib/toolbox/patching';
import { Strings } from './lib/toolbox/strings';
import { System } from './lib/toolbox/system';
import { ExtendPackage } from './lib/toolbox/extendPackage';
import { PackageManager } from './lib/toolbox/packageManager';
import { Print } from './lib/toolbox/print';
import { Prompt } from './lib/toolbox/prompt';
import { InjectImports } from './lib/toolbox/injectImports';

export interface GeneratorToolbox {
  context: {
    stack: string;
    root: string;
  };
  filesystem: Filesystem;
  patching: Patching;
  print: Print;
  prompt: Prompt;
  strings: Strings;
  system: System;
  extendPackage: ExtendPackage;
  packageManager: PackageManager;
  injectImports: InjectImports;
  template: {
    generate: ({
      template,
      target,
      props,
      templateDirectory,
    }: {
      template: string;
      target: string;
      props?: { [key: string]: any };
      templateDirectory?: string;
    }) => any;
    generateTree: ({
      templateDirectory,
      targetDirectory,
      props,
    }: {
      templateDirectory: string;
      targetDirectory?: string;
      props?: { [key: string]: any };
    }) => any;
  };
}
