import { patching } from './patching';
import merge from 'deepmerge';

const extendPackage = (props: any) => {
  return patching.update('package.json', (pkg) => {
    return merge(pkg, props);
  });
};

type ExtendPackage = typeof extendPackage;

export { extendPackage, ExtendPackage };
