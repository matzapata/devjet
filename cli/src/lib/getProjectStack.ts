import { filesystem } from './toolbox/filesystem';

function getProjectStack(root: string): 'nextjs' | 'react' | null {
  const isNextjs = filesystem.exists(filesystem.path(root, 'next.config.js'));
  const isReact = filesystem.exists(filesystem.path(root, 'src', 'index.tsx'));

  if (isNextjs) return 'nextjs';
  else if (isReact) return 'react';
  else return null;
}

export default getProjectStack;
