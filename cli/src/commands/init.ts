import { GluegunToolbox } from 'gluegun'
import gitly from 'gitly'

module.exports = {
  name: 'init',
  description: 'Create a PERN devjet project',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, filesystem, print, prompt, system } = toolbox

    let projectDirectory = parameters.first
    if (projectDirectory === undefined) {
      const res = await prompt.ask({
        type: 'input',
        name: 'name',
        message: 'Project directory',
      })
      projectDirectory = res.name
    }

    print.info(`Creating a new pern dejvet app at ${projectDirectory}`)

    if (filesystem.exists(projectDirectory)) {
      const overwrite = await prompt.confirm(
        `${projectDirectory} already exists. Would you like to overwrite it?`
      )
      if (overwrite) {
        print.info(`Removing ${projectDirectory}...`)
        filesystem.remove(projectDirectory)
      } else {
        print.error(`Couldn't create project at ${projectDirectory}`)
        return null
      }
    }

    print.info('Downloading boilerplate...')
    await gitly('matzapata/devjet-pern-boilerplate', projectDirectory, {})
    await system.run(
      `cd ${projectDirectory} && git init && git add . && git commit -m "First commit by devjet"`
    )

    print.success(`Generated pern project at ${projectDirectory}`)
    print.info(`- cd ${projectDirectory}/api && npm install`)
    print.info(`- cd ${projectDirectory}/client && npm install`)
  },
}
