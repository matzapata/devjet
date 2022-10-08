import { build } from 'gluegun';

/**
 * Create the cli and kick it off
 */
async function run(argv) {
  const cli = build()
    .brand('devjet')
    .src(__dirname)
    .plugins('./node_modules', { matching: 'devjet-*', hidden: false })
    .version() // provides default for version, v, --version, -v
    .help()
    .create();
  const toolbox = await cli.run(argv);

  // send it back (for testing, mostly)
  return toolbox;
}

module.exports = { run };
