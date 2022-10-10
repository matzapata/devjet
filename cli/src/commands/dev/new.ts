import { print } from '../../lib/print';
import { filesystem } from '../../lib/filesystem';
import { render } from '../../lib/template';

async function newGenerator(name: string): Promise<unknown> {
  if (name.includes(' ')) {
    return print.error('Generators names cant contains spaces');
  }

  const projectDirectory = `devjet-${name}`;
  print.info(`Creating a new devjet generator at ${projectDirectory}`);

  if (filesystem.exists(projectDirectory)) {
    return print.error(
      `Couldn't create generator at ${projectDirectory}. Folder already exists.`
    );
  }

  filesystem.copy(
    filesystem.path(__dirname, '..', '..', 'templates', 'generator'),
    projectDirectory,
    { matching: '!package.json' }
  );

  render({
    template: 'generator/package.json',
    target: `${projectDirectory}/package.json`,
    props: { name },
  });

  print.info('Create your examples at `examples` folder with npx devjet new');
  print.info('Please edit accordingly the following files:');
  print.info('- src/commands/index.ts');
  print.info('- package.json');
  print.info(
    '- Create your posts in the posts folder, remember that the file is copied directly so include the slug in the name of it. Use `react-`, `nextjs-` or none to target both stacks.'
  );
}

export default newGenerator;
