import {
  GluegunFilesystem,
  GluegunHttp,
  GluegunMeta,
  GluegunPackageManager,
  GluegunParameters,
  GluegunPatching,
  GluegunPrint,
  GluegunPrompt,
  GluegunSemver,
  GluegunStrings,
  GluegunSystem,
} from 'gluegun';

export interface GeneratorToolbox {
  context: {
    stack: string;
    root: string;
  };
  parameters: GluegunParameters;
  filesystem: GluegunFilesystem;
  http: GluegunHttp;
  meta: GluegunMeta;
  patching: GluegunPatching;
  print: GluegunPrint;
  prompt: GluegunPrompt;
  semver: GluegunSemver;
  strings: GluegunStrings;
  system: GluegunSystem;
  packageManager: GluegunPackageManager;
  template: {
    generate: ({
      template,
      target,
      props,
      directory,
    }: {
      template: string;
      target: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      props?: { [key: string]: any };
      directory?: string;
    }) => Promise<string>;
  };
  step: (
    message: string,
    action?: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      all?: () => Promise<any>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      react?: () => Promise<any>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pern?: () => Promise<any>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      nextjs?: () => Promise<any>;
    }
  ) => Promise<void>;
}
