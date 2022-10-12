import { GeneratorToolbox } from "devjet";

module.exports = {
  description: "Add cloudflare analytics to your project",
  run: async (toolbox: GeneratorToolbox) => {
    const { stack } = toolbox.context;

    if (stack === "nextjs") {
      if (toolbox.filesystem.exists("pages/_document.tsx")) {
        await toolbox.patching.insertLine(
          "pages/_document.tsx",
          `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "your-cloudflare-site-token"}'></script>`,
          "</body>",
          { before: true }
        );
      } else {
        await toolbox.template.generate({
          template: "_document.tsx.ejs",
          target: "pages/_document.tsx",
        });
      }
    } else {
      toolbox.print.error(
        "Sorry, this generator is only available for nextjs projects"
      );
    }
  },
};
