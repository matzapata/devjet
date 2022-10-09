import { GluegunToolbox } from "gluegun";

const cloudflareAnalyticsScript = `<script
defer
src="https://static.cloudflareinsights.com/beacon.min.js"
data-cf-beacon='{"token": "your-cloudflare-site-token"}'
></script>`;

module.exports = {
  description: "Example generator",
  run: async (toolbox: GluegunToolbox) => {
    const { stack } = toolbox.context;

    if (stack === "nextjs") {
      if (toolbox.filesystem.exists("pages/_document.tsx")) {
        await toolbox.patching.patch("pages/_document.tsx", {
          insert: cloudflareAnalyticsScript,
          before: "</body>",
        });
      } else {
        await toolbox.template.generate({
          template: "_document.tsx.ejs",
          target: "pages/_document.tsx",
        });
      }
      toolbox.print.warning(
        "Remember to update _document.tsx with your cloudflare token"
      );
    }
  },
};
