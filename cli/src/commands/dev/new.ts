import { GluegunToolbox } from 'gluegun';

module.exports = {
  name: 'new',
  hidden: true,
  description: `Create a new devjet generator asociated to a post`,
  run: async (toolbox: GluegunToolbox) => {
    const { filesystem, print, prompt } = toolbox;

    const { postSlug } = await prompt.ask({
      name: 'postSlug',
      type: 'input',
      message: 'What is the post slug?',
    });

    if (postSlug.includes(' ')) {
      return print.error('Slugs cant contains spaces');
    }

    const projectDirectory = `devjet-${postSlug}`;
    print.info(`Creating a new devjet post at ${projectDirectory}`);

    if (filesystem.exists(projectDirectory)) {
      return print.error(
        `Couldn't create project at ${projectDirectory}. Folder already exists.`
      );
    }

    filesystem.copy(
      filesystem.path(__dirname, '..', '..', 'templates', 'generator'),
      projectDirectory
    );

    print.success('All done!');
    print.info('Create your example at example folder with npx devjet new');
    print.info('Please edit accordingly the following files:');
    print.info('- src/commands/index.ts');
    print.info('- src/commands/index.ts');
    print.info('- package.json');
    print.info('- post.mdx');
  },
};
