import gitly from 'gitly';
import { print } from '../lib/toolbox/print';
import { filesystem } from '../lib/toolbox/filesystem';
import { prompt } from '../lib/toolbox/prompt';
import { system } from '../lib/toolbox/system';

async function newProject(
  projectDirectory: string,
  isNextjs: boolean,
  isReact: boolean
): Promise<unknown> {
  let stack = null;
  if (isReact) stack = 'react';
  else if (isNextjs) stack = 'nextjs';
  else {
    const { promptStack } = await prompt.ask({
      type: 'select',
      name: 'promptStack',
      message: 'Chose your stack:',
      choices: ['react', 'nextjs'],
    });
    stack = promptStack;
  }

  print.info(`Creating a new ${stack} app at ${projectDirectory} with devjet`);

  if (filesystem.exists(projectDirectory)) {
    return print.error(
      `Couldn't create project at ${projectDirectory}. Folder already exists.`
    );
  }

  print.info('Downloading boilerplate...');
  try {
    await gitly(`matzapata/devjet-${stack}-boilerplate`, projectDirectory, {});
    print.info('Initializing repository...');
    await system.run(
      `cd ${projectDirectory} && git init && git add . && git commit -m "First commit by devjet"`
    );

    print.success(`Successfully generated project at ${projectDirectory}`);
    print.info(
      `Please install dependencies.\nFor further information visit https://www.usedevjet.com/`
    );
  } catch (e) {
    print.error('Error creating devjet boilerplate');
    print.error(e);
  }
}

export default newProject;
