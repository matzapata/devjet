import { GluegunToolbox } from "gluegun";

module.exports = {
  description: "Example generator",
  run: async (toolbox: GluegunToolbox) => {
    await toolbox.step("1. First step", {});
  },
};
