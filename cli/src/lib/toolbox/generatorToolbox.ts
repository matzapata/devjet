import { filesystem } from './filesystem';
import { patching } from './patching';
import { strings } from './strings';
import { system } from './system';
import { extendPackage } from './extendPackage';
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
    patching,
    print,
    prompt,
    strings,
    system,
    extendPackage,
    injectImports,
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