/* eslint-disable @typescript-eslint/no-explicit-any */
import { GluegunToolbox } from "gluegun";

const step = async (
  toolbox: GluegunToolbox,
  message: string,
  stack: string,
  action: {
    all?: () => Promise<any>;
    react?: () => Promise<any>;
    pern?: () => Promise<any>;
    nextjs?: () => Promise<any>;
  }
): Promise<void> => {
  try {
    if (action.all !== undefined) await action.all();
    if (action[stack] !== undefined) await action[stack]();

    toolbox.print.success(`${toolbox.print.checkmark} ${message}`);
  } catch (e) {
    toolbox.print.error(`${toolbox.print.xmark}  ${message}`);
    toolbox.print.error(`Error message: ${e.message}`);
  }
};

export default step;
