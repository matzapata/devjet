import findGitRoot from 'find-git-root';

function getProjectRoot(): string {
  return findGitRoot(process.cwd()).replace('/.git', '').replace('\\.git', '');
}

export default getProjectRoot;
