import { GluegunToolbox } from 'gluegun'
import gitly from 'gitly'

module.exports = {
  name: 'init',
  description: 'Create a new post for devjet',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, filesystem, print, prompt, system, template } = toolbox

    let postSlug = parameters.first
    if (postSlug === undefined) {
      const res = await prompt.ask({
        type: 'input',
        name: 'name',
        message: 'Receipe slug',
      })
      postSlug = res.name
    }
    const projectDirectory = `devjet-${postSlug}`

    print.info(`Creating a new pern dejvet app at ${projectDirectory}`)
    print.info(`Creating post branch post-${postSlug}`)

    // await system.run(`git checkout -b post-${receipeSlug}`)

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

    try {
      await template.generate({
        template: 'post/post.mdx',
        target: `${projectDirectory}/${postSlug}.mdx`,
        props: {
          date: new Date().toISOString().slice(0, 10),
        },
      })

      await gitly('matzapata/devjet-pern-boilerplate', projectDirectory, {})
      await system.run(
        `cd ${projectDirectory} && git init && git add . && git commit -m "First commit by devjet"`
      )

      print.success(`Generated pern project at ${projectDirectory}`)
      print.info(`- cd ${projectDirectory}/api && npm install`)
      print.info(`- cd ${projectDirectory}/client && npm install`)
    } catch (e) {
      print.error('Error creating devjet boilerplate')
      print.info(`Removing ${projectDirectory}...`)
      filesystem.remove(projectDirectory)
      print.error(e)
    }
  },
}
