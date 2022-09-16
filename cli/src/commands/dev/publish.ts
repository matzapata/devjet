import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'publish',
  description: 'Publish post to usedevjet.com',
  run: async (toolbox: GluegunToolbox) => {
    const { print } = toolbox

    print.info('Publish')
  },
}
