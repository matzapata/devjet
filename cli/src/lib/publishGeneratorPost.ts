import { filesystem } from './toolbox/filesystem';
import { patching } from './toolbox/patching';

async function publishGeneratorPost(src: string, dst: string): Promise<void> {
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

export { publishGeneratorPost };
