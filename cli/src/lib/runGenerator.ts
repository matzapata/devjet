import { prompt } from './toolbox/prompt';
import { print } from './toolbox/print';
import { system } from './toolbox/system';
import { filesystem } from './toolbox/filesystem';
import { createGeneratorToolbox } from './toolbox/generatorToolbox';

async function runGenerator(
  context: {
    stack: string;
    root: string;
  },
  generatorFolder: string,
  command: string
): Promise<unknown> {
  // Check everything is ok
  const isReady = await prompt.confirm(
    'We strongly recommend to run devjet generators on a new branch or with a previous commit so you can review the changes applied. Are you ready to continue?'
  );
  if (!isReady) return print.error('Take your time, no problem!');
  print.warning(
    'Hey, if you changed the default folder structure, some things may break...'
  );

  const generator = await import(
    filesystem.path(generatorFolder, 'build', 'commands', `${command}.js`)
  );
  if (generator) {
    const generatorToolbox = createGeneratorToolbox(context, generatorFolder);
    await generator.run(generatorToolbox);
    await system.run('npm run lint:fix');

    print.info(
      'Please follow instruction at usedevjet.com on how to use this generator'
    );
  } else print.error('Auchh, it seams like that command does not exist');
}

export default runGenerator;
