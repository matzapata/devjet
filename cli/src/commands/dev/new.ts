import { GluegunToolbox } from 'gluegun';

module.exports = {
  name: 'new',
  hidden: true,
  description: `Create a new devjet generator asociated to a post`,
  run: async (toolbox: GluegunToolbox) => {
    const { filesystem, print, prompt, template } = toolbox;

    const { generatorName } = await prompt.ask({
      name: 'generatorName',
      type: 'input',
      message: 'What is the post slug?',
    });

    if (generatorName.includes(' ')) {
      return print.error('Slugs cant contains spaces');
    }

    const projectDirectory = `devjet-${generatorName}`;
    print.info(`Creating a new devjet post at ${projectDirectory}`);

    if (filesystem.exists(projectDirectory)) {
      return print.error(
        `Couldn't create project at ${projectDirectory}. Folder already exists.`
      );
    }

    filesystem.copy(
      filesystem.path(__dirname, '..', '..', 'templates', 'generator'),
      projectDirectory,
      { matching: '!package.json' }
    );

    template.generate({
      template: 'generator/package.json',
      target: `${projectDirectory}/package.json`,
      props: { generatorName },
    });

    print.info('Create your examples at `examples` folder with npx devjet new');
    print.info('Please edit accordingly the following files:');
    print.info('- src/commands/index.ts');
    print.info('- package.json');
    print.info(
      '- Create your posts in the posts folder, remember that the file is copied directly so include the slug in the name of it. Use `react-`, `nextjs-` or none to target both stacks.'
    );
  },
};
