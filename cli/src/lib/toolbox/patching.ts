import { patching as gluegunPatching } from 'gluegun';
import InsertLine from 'insert-line';
import { tryCatchWrapper, tryCatchWrapperSync } from '../tryCatchWrapper';
import { filesystem } from './filesystem';
import { print } from './print';

function getMatchLineNumber(
  filename: string,
  exp: string | RegExp
): number | null {
  const content = filesystem.read(filename);
  const lines = content.split('\n');
  const re =
    typeof exp === 'string' ? new RegExp(exp.replace('/', '\\/')) : exp;

  for (let i = 0; i < lines.length; i++) {
    if (re.exec(lines[i])) return i + 1;
  }
  return null;
}

function insertLine(
  filename: string,
  line: string,
  exp: string | RegExp,
  opts: {
    before?: boolean;
    after?: boolean;
    replace?: boolean;
  }
): null | void {
  const fn = tryCatchWrapperSync(
    (
      filename: string,
      line: string,
      exp: string | RegExp,
      opts: {
        before?: boolean;
        after?: boolean;
        replace?: boolean;
      }
    ) => {
      let insertionLineNum = getMatchLineNumber(filename, exp);
      if (insertionLineNum === null) throw new Error('Not found');

      if (opts.after && !opts.replace) insertionLineNum++;
      if (opts.replace) insertionLineNum--;
      return InsertLine(filename)
        .contentSync(line, { overwrite: opts.replace ? opts.replace : false })
        .at(insertionLineNum);
    },
    () => print.muted(`Updated ${filename}`),
    () => {
      if (opts.replace) {
        print.error(
          `Error updating ${filename}. Couldn't replace:\n${exp}\nwith\n${line}`
        );
      } else {
        print.error(
          `Error updating ${filename}. Couldn't insert:\n${line}\n${
            opts.before ? 'before: ' : 'after: '
          }\n${exp}`
        );
      }
    }
  );
  return fn(filename, line, exp, opts);
}

function prependLine(filename: string, line: string): unknown {
  const fn = tryCatchWrapperSync(
    () => InsertLine(filename).prependSync(line),
    () => print.muted(`Updated ${filename}`),
    () => print.error(`Error updating ${filename}. Couldn't prepend:\n${line}`)
  );
  return fn();
}
function prependManyLines(filename: string, lines: string[]): unknown {
  return prependLine(filename, lines.join('\n'));
}

function appendLine(filename: string, line: string): unknown {
  const fn = tryCatchWrapperSync(
    () => InsertLine(filename).appendSync(line),
    () => print.muted(`Updated ${filename}`),
    () => print.error(`Error updating ${filename}. Couldn't append:\n${line}`)
  );
  return fn();
}
function appendManyLines(filename: string, lines: string[]): unknown {
  return appendLine(filename, lines.join('\n'));
}

function update(filename: string, opts: any): unknown {
  const fn = tryCatchWrapper(
    gluegunPatching.update,
    () => print.muted(`Updated ${filename}`),
    () =>
      print.error(
        `Error updating ${filename}. Please carefully review recipe at usedevjet.com`
      )
  );
  return fn(filename, opts);
}
function updateMany(operations: { filename: string; config: any }[]) {
  return Promise.all(operations.map((op) => update(op.filename, op.config)));
}

function append(filename, data) {
  const fn = tryCatchWrapper(
    gluegunPatching.append,
    () => print.muted(`Updated ${filename}`),
    () => print.error(`Error updating ${filename}. Couldn't append:\n${data}`)
  );
  return fn(filename, data);
}
function appendMany(operations: { filename: string; data: any }[]) {
  return Promise.all(operations.map((op) => append(op.filename, op.data)));
}

function prepend(filename, data) {
  const fn = tryCatchWrapper(
    gluegunPatching.prepend,
    () => print.muted(`Updated ${filename}`),
    () => print.error(`Error updating ${filename}. Couldn't prepend:\n${data}`)
  );
  return fn(filename, data);
}
function prependMany(operations: { filename: string; data: any }[]) {
  return Promise.all(operations.map((op) => prepend(op.filename, op.data)));
}

function replace(filename, src, dst) {
  const fn = tryCatchWrapper(
    gluegunPatching.replace,
    () => print.muted(`Updated ${filename}`),
    () =>
      print.error(
        `Error updating ${filename}. Couldn't replace:\n${src}\nwith:\n${dst}`
      )
  );
  return fn(filename, src, dst);
}
function replaceMany(
  operations: { filename: string; src: string; dst: string }[]
) {
  return Promise.all(
    operations.map((op) => replace(op.filename, op.src, op.dst))
  );
}

function patch(filename, opts) {
  const fn = tryCatchWrapper(
    gluegunPatching.patch,
    () => print.muted(`Updated ${filename}`),
    () => print.error(`Error updating ${filename}`)
  );
  return fn(filename, opts);
}
function patchMany(operations: { filename: string; opts: any }[]) {
  return Promise.all(operations.map((op) => patch(op.filename, op.opts)));
}

const patching = {
  ...gluegunPatching,
  append,
  appendMany,
  prepend,
  prependMany,
  replace,
  replaceMany,
  patch,
  patchMany,
  update,
  updateMany,
  insertLine,
  prependLine,
  prependManyLines,
  appendLine,
  appendManyLines,
};

type Patching = typeof patching;

export { patching, Patching };
