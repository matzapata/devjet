import { filesystem } from './filesystem';
import { strings } from './strings';
import ejs from 'ejs';

/**
 * Generates a file from a template.
 *
 * @return The generated string.
 */
async function render({
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
    ? `${templateDirectory}/${template}`
    : `${filesystem.path(__dirname, '..', 'templates')}/${template}`;

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

export { render };
