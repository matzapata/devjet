import { program } from '@caporal/core';
import newProject from './commands/new';

program
  // First possible command: "order"
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
  });

program.run();
