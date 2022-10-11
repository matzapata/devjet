import { filesystem } from './filesystem';
import { patching } from './patching';
import { strings } from './strings';
import { system } from './system';
import { extendPackage } from './extendPackage';
import { packageManager } from './packageManager';
import { generate, generateTree } from './template';
import { print } from './print';
import { prompt } from './prompt';
import { injectImports } from './injectImports';

interface GeneratorToolbox {
  context: {
    stack: string;
    root: string;
  };
  filesystem: any;
  patching: any;
  print: any;
  prompt: any;
  strings: any;
  system: any;
  extendPackage: any;
  packageManager: any;
  injectImports: any;
  template: {
    generate: ({ template, target, props, templateDirectory }) => any;
    generateTree: ({ templateDirectory, targetDirectory, props }) => any;
  };
}

function createGeneratorToolbox(
  context: {
    stack: string;
    root: string;
  },
  generatorFolder: string
): GeneratorToolbox {
  return {
    context,
    filesystem,
    print,
    prompt,
    strings,
    system,
    extendPackage,
    packageManager,
    injectImports,
    patching: {
      exists: patching.exists,
      update: (operations: { filename: string; config: any }[]) => {
        const update = async (filename, config) => {
          try {
            await patching.update(filename, config);
            print.muted(`Updated ${filename}`);
          } catch (e) {
            print.error(`Error updating ${filename}`);
          }
        };
        return Promise.all(
          operations.map((op) => update(op.filename, op.config))
        );
      },
      append: (operations: { filename: string; data: any }[]) => {
        const append = async (filename, data) => {
          try {
            await patching.append(filename, data);
            print.muted(`Updated ${filename}`);
          } catch (e) {
            print.error(`Error updating ${filename}`);
          }
        };
        return Promise.all(
          operations.map((op) => append(op.filename, op.data))
        );
      },
      prepend: (operations: { filename: string; data: any }[]) => {
        const prepend = async (filename, data) => {
          try {
            await patching.prepend(filename, data);
            print.muted(`Updated ${filename}`);
          } catch (e) {
            print.error(`Error updating ${filename}`);
          }
        };
        return Promise.all(
          operations.map((op) => prepend(op.filename, op.data))
        );
      },
      replace: (
        operations: { filename: string; src: string; dst: string }[]
      ) => {
        const replace = async (filename, src, dst) => {
          try {
            await patching.replace(filename, src, dst);
            print.muted(`Updated ${filename}`);
          } catch (e) {
            print.error(`Error updating ${filename}`);
          }
        };
        return Promise.all(
          operations.map((op) => replace(op.filename, op.src, op.dst))
        );
      },
      patch: (operations: { filename: string; opts: any }[]) => {
        const patch = async (filename, config) => {
          try {
            await patching.patch(filename, config);
            print.muted(`Updated ${filename}`);
          } catch (e) {
            print.error(`Error updating ${filename}`);
          }
        };
        return Promise.all(operations.map((op) => patch(op.filename, op.opts)));
      },
    },
    template: {
      generate: ({ template, target, props, templateDirectory }) => {
        return generate({
          templateDirectory: templateDirectory
            ? templateDirectory
            : filesystem.path(generatorFolder, 'build', 'templates'),
          template,
          target,
          props,
        }).then(() => print.muted(`Generated ${target}`));
      },
      generateTree: ({ templateDirectory, targetDirectory, props }) => {
        // Make templateDirectory relative to generator templates folder and target directory cwd by default
        return generateTree({
          templateDirectory: filesystem.path(
            generatorFolder,
            'build',
            'templates',
            templateDirectory
          ),
          targetDirectory: targetDirectory ? targetDirectory : filesystem.cwd(),
          props,
        }).then((files) =>
          files.forEach((file) =>
            print.muted(`Generated ${file.replace('./', '')}`)
          )
        );
      },
    },
  };
}

export { createGeneratorToolbox };
