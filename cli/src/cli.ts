import { program } from '@caporal/core';
import newGenerator from './commands/dev/new';
import publishCommand from './commands/dev/publish';
import newProject from './commands/new';
import runCommand from './commands/run';

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

  .command(
    'run',
    'Run devjet generators to inject features in your devjet project'
  )
  .argument('<package>', 'Generator package')
  .argument('[generator]', 'Specific generator to be run')
  .option('--dev', 'Do not install generator package', { required: false })
  .action(({ args, options }) => {
    return runCommand(
      args.package as string,
      options.dev as boolean,
      args.generator as string
    );
  })

  .command('dev-new', `Create a devjet generator with it's posts`)
  .hide()
  .argument('<name>', 'Generator package name')
  .action(({ args }) => {
    return newGenerator(args.name as string);
  })

  .command('dev-publish', `Publish generator post`)
  .hide()
  .action(() => {
    return publishCommand();
  });

program.disableGlobalOption('--verbose');
program.disableGlobalOption('--quiet');
program.disableGlobalOption('--no-color');
program.run();
