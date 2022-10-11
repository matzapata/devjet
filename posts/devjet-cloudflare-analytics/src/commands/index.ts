const cloudflareAnalyticsScript = `<script
defer
src="https://static.cloudflareinsights.com/beacon.min.js"
data-cf-beacon='{"token": "your-cloudflare-site-token"}'
></script>`;

module.exports = {
  description: "Add cloudflare analytics to your project",
  run: async (toolbox) => {
    const { stack } = toolbox.context;

    if (stack === "nextjs") {
      if (toolbox.filesystem.exists("pages/_document.tsx")) {
        await toolbox.patching.patch([
          {
            filename: "pages/_document.tsx",
            opts: {
              insert: cloudflareAnalyticsScript,
              before: "</body>",
            },
          },
        ]);
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
