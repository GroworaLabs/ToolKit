import type { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What is a .gitignore file?',
    a: 'A .gitignore file tells Git which files and directories to skip when tracking changes. Entries are glob patterns — a line like node_modules/ means "ignore any directory named node_modules at any depth". Git reads .gitignore from the repository root and from subdirectories, with more specific rules taking precedence.',
  },
  {
    q: 'Where should I place the .gitignore file?',
    a: 'Place the generated .gitignore in your repository root alongside the .git directory. Git also respects .gitignore files in subdirectories — rules in a subdirectory\'s .gitignore apply only to files within that directory and its children. For rules that apply globally across all your repos, use ~/.gitignore_global and register it with git config --global core.excludesFile.',
  },
  {
    q: 'Why do I still see ignored files in git status?',
    a: 'If a file was tracked before you added a .gitignore rule for it, Git continues tracking it — .gitignore only prevents untracked files from being added. To stop tracking a file that is already committed: run git rm --cached <file>, then commit the removal. After that, Git will honour the ignore rule.',
  },
  {
    q: 'What does the "!" prefix mean in .gitignore?',
    a: 'A line starting with ! negates a previous pattern, re-including a file that would otherwise be ignored. For example, *.log ignores all log files, but !important.log re-includes that specific file. Note: if a parent directory is ignored, you cannot re-include files inside it — Git stops descending into ignored directories.',
  },
  {
    q: 'Should I commit the .gitignore file?',
    a: 'Yes. Commit .gitignore to the repository so all collaborators share the same ignore rules. This prevents OS-specific files (like .DS_Store on macOS or Thumbs.db on Windows) and IDE settings from polluting other developers\' git status. The generated file is safe to commit immediately.',
  },
  {
    q: 'How do I ignore a file that is already tracked?',
    a: 'Adding a pattern to .gitignore does not remove already-tracked files. Run git rm --cached <file> (or git rm --cached -r <directory>) to untrack the file without deleting it locally, then commit. After that, the file remains on your disk but Git ignores future changes to it.',
  },
  {
    q: 'Can I combine multiple technology templates?',
    a: 'Yes — that is the primary purpose of this generator. Select every technology in your stack and the tool merges all their rules into a single .gitignore with clear section headers. Duplicate patterns are collapsed automatically. A typical full-stack project might combine Node.js, React, Python, VS Code, and macOS sections.',
  },
  {
    q: 'Are these templates based on the official GitHub templates?',
    a: 'The rules are derived from and compatible with the official GitHub gitignore templates (github.com/github/gitignore), with additions for common modern tooling (pnpm, Bun, Vite, Turborepo, etc.). The templates are maintained as part of this tool and updated when the ecosystem changes.',
  },
];

export const sidebarTips = [
  { tip: 'Commit it immediately', desc: 'Add .gitignore to your first commit so ignored files are never accidentally staged.' },
  { tip: 'Untrack before ignoring', desc: 'Run git rm --cached <file> to stop tracking an already-committed file.' },
  { tip: 'Use global gitignore', desc: 'Put OS/editor rules in ~/.gitignore_global so they apply to every project.' },
  { tip: 'Test patterns with git check-ignore', desc: 'Run git check-ignore -v <file> to debug which rule is matching a file.' },
];
