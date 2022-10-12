import { filesystem } from './filesystem';
import { strings } from './strings';
import ejs from 'ejs';

/**
 * Generates a file from a template.
 *
 * @return The generated string.
 */
async function generate({
  template,
  target,
  props,
  templateDirectory,
}: {
  template: string;
  target: string;
  templateDirectory?: string; //By default devjet cli template dir
  props?: { [key: string]: any };
}): Promise<string> {
  // add some goodies to the environment so templates can read them
  const data = {
    props,
    filename: '',
    ...strings, // add our string tools to the filters available
  };

  const pathToTemplate = templateDirectory
    ? filesystem.path(templateDirectory, template)
    : filesystem.path(__dirname, '..', '..', 'templates', template);

  // bomb if the template doesn't exist
  if (!filesystem.isFile(pathToTemplate)) {
    throw new Error(`template not found ${pathToTemplate}`);
  }

  // add template path to support includes
  data.filename = pathToTemplate;

  // read the template
  const templateContent = filesystem.read(pathToTemplate);

  // render the template
  const content = ejs.render(templateContent, data);

  // save it to the file system
  if (!strings.isBlank(target)) {
    // prep the destination directory
    const dir = target.replace(/$(\/)*/g, '');
    const dest = filesystem.path(dir);

    filesystem.write(dest, content);
  }

  // send back the rendered string
  return content;
}

function getTreeFiles(node, files = []) {
  if (node.type === 'file') files.push(node.relativePath);
  else {
    for (const children of node.children) {
      files.push(...getTreeFiles(children));
    }
  }
  return files;
}

function getFolderFiles(srcDirectory: string): string[] {
  const tree = filesystem.inspectTree(srcDirectory, {
    relativePath: true,
  });

  return getTreeFiles(tree);
}

async function generateTree({
  templateDirectory,
  targetDirectory,
  props,
}: {
  templateDirectory: string;
  targetDirectory: string;
  props?: { [key: string]: any };
}): Promise<string[]> {
  const templates = getFolderFiles(templateDirectory);

  for (const file of templates) {
    await generate({
      templateDirectory,
      template: file.replace('./', ''),
      target: filesystem.path(
        targetDirectory,
        ...file.replace('./', '').split('/')
      ),
      props,
    });
  }

  return templates;
}

const template = {
  generate,
  generateTree,
};

type Template = typeof template;

export { Template, template };
