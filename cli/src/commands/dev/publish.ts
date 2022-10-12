import { print } from '../../lib/toolbox/print';
import { filesystem } from '../../lib/toolbox/filesystem';
import { prompt } from '../../lib/toolbox/prompt';
import { publishGeneratorPost } from '../../lib/publishGeneratorPost';

async function publishGeneratorCommand(): Promise<unknown> {
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
    await publishGeneratorPost(`posts/${post}`, post);
    print.success(`${print.checkmark} Successfully published ${post}`);
  }

  print.info('Verify everything and git commit and push. Then deploy');
  print.info('To publish de generator run `npm publish`');
}

export default publishGeneratorCommand;
