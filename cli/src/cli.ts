import { program } from '@caporal/core';
import newGenerator from './commands/dev/new';
import publishCommand from './commands/dev/publish';
import newProject from './commands/new';

program
  .command('new', 'Bootstrap your Devjet project')
  .argument('<name>', 'ProjectName')
  .option('--nextjs', 'Create a nextjs project', { required: false })
  .option('--react', 'Create a react project', { required: false })
  .action(({ args, options }) => {
    return newProject(
      args.name as string,
      options.nextjs as boolean,
      options.react as boolean
    );
  })
  .command('dev-new', `Create a devjet generator with it's posts`)
  .argument('<name>', 'Generator package name')
  .action(({ args }) => {
    return newGenerator(args.name as string);
  })
  .command('dev-publish', `Publish generator post`)
  .action(() => {
    return publishCommand();
  });

program.run();
