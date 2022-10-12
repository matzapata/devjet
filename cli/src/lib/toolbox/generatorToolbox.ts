import { filesystem } from './filesystem';
import { patching } from './patching';
import { strings } from './strings';
import { system } from './system';
import { extendPackage } from './extendPackage';
import { packageManager } from './packageManager';
import { template as templateModule } from './template';
import { print } from './print';
import { prompt } from './prompt';
import { injectImports } from './injectImports';
import { GeneratorToolbox } from '../../types';

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
    patching,
    template: {
      generate: ({ template, target, props, templateDirectory }) => {
        return templateModule
          .generate({
            templateDirectory: templateDirectory
              ? templateDirectory
              : filesystem.path(generatorFolder, 'build', 'templates'),
            template,
            target,
            props,
          })
          .then(() => print.muted(`Generated ${target}`));
      },
      generateTree: ({ templateDirectory, targetDirectory, props }) => {
        // Make templateDirectory relative to generator templates folder and target directory cwd by default
        return templateModule
          .generateTree({
            templateDirectory: filesystem.path(
              generatorFolder,
              'build',
              'templates',
              templateDirectory
            ),
            targetDirectory: targetDirectory
              ? targetDirectory
              : filesystem.cwd(),
            props,
          })
          .then((files) =>
            files.forEach((file) =>
              print.muted(`Generated ${file.replace('./', '')}`)
            )
          );
      },
    },
  };
}

export { createGeneratorToolbox };
