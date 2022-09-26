import { GluegunToolbox } from 'gluegun';
import getContext from '../lib/context';
import step from '../lib/step';

module.exports = {
  name: '',
  description: '',
  run: async (toolbox: GluegunToolbox) => {
    const { stack } = await getContext(toolbox);

    await step(toolbox, '1. First step', stack, {
      all: async () => console.log('All actions'),
      react: async () => console.log('React actions'),
      pern: async () => console.log('Pern actions'),
      nextjs: async () => console.log('Nextjs actions'),
    });

    toolbox.print.success('All done!!');
  },
};
