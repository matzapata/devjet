import { GluegunToolbox } from 'gluegun';

async function publish(filesystem, patching, src, dst) {
  const publishPath = filesystem.path(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    'usedevjet',
    'posts',
    dst
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

    const posts = filesystem.list('posts/');
    const { publishList } = (await prompt.ask({
      type: 'multiselect',
      name: 'publishList',
      message: 'Which posts do you want to publish?',
      choices: posts,
    })) as { publishList: string[] };

    for (const post of publishList) {
      await publish(filesystem, patching, `posts/${post}`, post);
      print.success(`${print.checkmark} Successfully published ${post}`);
    }

    print.info('Verify everything and git commit and push. Then deploy');
    print.info('To publish de generator run `npm publish`');
  },
};
