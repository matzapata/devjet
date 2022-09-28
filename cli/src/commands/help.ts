import { GluegunToolbox } from 'gluegun';

const command = {
  name: 'help',
  alias: 'h',
  run: (toolbox: GluegunToolbox): void => {
    console.log(
      toolbox.print.colors.bold('\nUsage: devjet <command> [OPTIONS]')
    );
    console.log(toolbox.print.colors.bold('\nCommands:'));
    toolbox.print.info('  help');

    toolbox.runtime.plugins.forEach((plugin) => {
      if (plugin.name !== 'devjet') {
        console.log(`${toolbox.print.colors.bold(plugin.name)} - (plugin)`);
      }

      plugin.commands.forEach((command) => {
        const commandPath = command.commandPath;
        commandPath[commandPath.length - 1] = command.name;

        let help = `  ${commandPath.join(' ')}`;
        if (command.description) help += ` - ${command.description}`;
        if (
          command.name !== 'devjet' &&
          (!command.hidden || toolbox.parameters.options.all)
        ) {
          toolbox.print.info(help);
        }
      });
    });

    console.log(toolbox.print.colors.bold('\nFurther help:'));
    toolbox.print.info(
      '  To add plugins check out receipes at www.usedevjet.com'
    );
    toolbox.print.info(
      '  Except for the stack generators, we recomend you to remove plugins once used'
    );
    toolbox.print.info('  Remove plugins with "npm uninstall plugin_name"');

    console.log('\n');
  },
};

export default command;
