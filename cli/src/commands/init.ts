import { GluegunToolbox } from 'gluegun'

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

    await filesystem.copy(
      filesystem.path(__dirname, '../templates/pern'),
      `./${projectDirectory}`
    )

    await system.run(
      `cd ${projectDirectory} && git init && git add . && git commit -m "First commit by devjet"`
    )

    print.success(`Generated pern project at ${projectDirectory}`)
    print.info(`- cd ${projectDirectory}/api && npm install`)
    print.info(`- cd ${projectDirectory}/client && npm install`)
  },
}
