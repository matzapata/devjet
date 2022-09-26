import { GluegunToolbox } from 'gluegun';
import gitly from 'gitly';

module.exports = {
  name: 'new',
  description: `Bootstrap your Devjet project. Usage: devjet new projectname`,
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, filesystem, print, prompt, system } = toolbox;

    const projectDirectory = parameters.first;
    if (projectDirectory === undefined) {
      return print.error('Project name was not provided');
    }

    const { stack } = await prompt.ask({
      type: 'select',
      name: 'stack',
      message: 'Chose your stack:',
      choices: ['react', 'nextjs', 'pern'],
    });

    print.info(
      `Creating a new ${stack} app at ${projectDirectory} with devjet`
    );

    if (filesystem.exists(projectDirectory)) {
      return print.error(
        `Couldn't create project at ${projectDirectory}. Folder already exists.`
      );
    }

    print.info('Downloading boilerplate...');
    try {
      await gitly(
        `matzapata/devjet-${stack}-boilerplate`,
        projectDirectory,
        {}
      );
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
  },
};
