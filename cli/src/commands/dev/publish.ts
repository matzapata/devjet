import { GluegunToolbox } from 'gluegun';

module.exports = {
  name: 'publish',
  hidden: true,
  description: `Publish your post to usedejet.com`,
  run: async (toolbox: GluegunToolbox) => {
    const { filesystem, print, prompt } = toolbox;

    const isAtRoot = await prompt.confirm(
      'Please confirm that you are at the root folder of your post (a small help, is the folder that contains the post.mdx file!)'
    );
    if (!isAtRoot) {
      return print.error(
        'Auchh, we cant resolve that yet, please move to the root folder and run this plugin again!'
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const pkg = filesystem.read('./package.json', 'json');
    if (!pkg.name) return print.error("Couldn't read package.json name");
    const slug = pkg.name.replace('devjet-', '');

    filesystem.copy(
      'post.mdx',
      filesystem.path('..', '..', 'usedevjet', 'posts', `${slug}.mdx`),
      { overwrite: true }
    );

    print.success('All done!');
    print.info(`Update the date at usedevjet/posts/${slug}.mdx`);
    print.info('Verify everything and git commit and push. Then deploy');
    print.info('To publish de generator run `npm publish`');
  },
};
