import { GluegunToolbox } from 'gluegun';

module.exports = {
  name: '',
  description: '',
  run: async (toolbox: GluegunToolbox) => {

    await toolbox.step('1. First step', {
      all: async () => console.log('All actions'),
      react: async () => console.log('React actions'),
      pern: async () => console.log('Pern actions'),
      nextjs: async () => console.log('Nextjs actions'),
    });
  },
};
