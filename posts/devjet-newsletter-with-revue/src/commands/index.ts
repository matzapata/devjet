import { GluegunToolbox } from 'gluegun';
import getContext from '../lib/context';
import step from '../lib/step';

module.exports = {
  name: 'newsletter-with-revue',
  description: 'Create a newsletter component with revue',
  run: async (toolbox: GluegunToolbox) => {
    const { stack } = await getContext(toolbox);

    await step(toolbox, '1. Create your account at https://www.getrevue.co/', stack, {
      all: async () => console.log('This one is on you 😉​'),
    });

    await step(toolbox, '2. Create the newsletter component', stack, {
      all: async () => console.log('Remember to update the username in your form action url'),
      react: () => toolbox.template.generate({
        template: "Newsletter.tsx",
        target: "src/components/Newsletter.tsx"
      }),
      pern: () => toolbox.template.generate({
        template: "Newsletter.tsx",
        target: "client/src/components/Newsletter.tsx"
      }),
      nextjs: () => toolbox.template.generate({
        template: "Newsletter.tsx",
        target: "components/Newsletter.tsx"
      }),
    });

    toolbox.print.success('All done!!');
  },
};
