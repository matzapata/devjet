import { GluegunToolbox } from 'gluegun';

async function publish(filesystem, patching, src, dst) {
  const postFilename = `${dst}.mdx`;
  const publishPath = filesystem.path(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    'usedevjet',
    'posts',
    postFilename
  );
  filesystem.remove(publishPath);
  filesystem.copy(src, publishPath, { overwrite: true });
  await patching.update(publishPath, (data) => {
    const today = new Date();
    const dateFrontmatter = `date: ${today.toLocaleDateString('en-US')}`;
    return data.replace(/(date:)'?(.*)/, dateFrontmatter);
  });
}

module.exports = {
  name: 'publish',
  hidden: true,
  description: `Publish your post to usedejet.com`,
  run: async (toolbox: GluegunToolbox) => {
    const { filesystem, print, prompt, patching } = toolbox;

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

    const publishUnique = await prompt.confirm('Publish post.mdx?');
    const publishReact = await prompt.confirm('Publish react-post.mdx?');
    const publishNextjs = await prompt.confirm('Publish nextjs-post.mdx?');

    if (publishUnique) {
      await publish(filesystem, patching, 'posts/post.mdx', `${slug}.mdx`);
    }
    if (publishReact) {
      await publish(
        filesystem,
        patching,
        'posts/react-post.mdx',
        `react-${slug}.mdx`
      );
    }
    if (publishNextjs) {
      await publish(
        filesystem,
        patching,
        'posts/nextjs-post.mdx',
        `nextjs-${slug}.mdx`
      );
    }

    print.success('All done!');
    print.info(`Update the date at usedevjet/posts/${slug}.mdx`);
    print.info('Verify everything and git commit and push. Then deploy');
    print.info('To publish de generator run `npm publish`');
  },
};
