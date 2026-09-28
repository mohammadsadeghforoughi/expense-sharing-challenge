'use client';

import { Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark';

export function AnimatedThemeToggler({
  theme,
  onThemeChange,
  label,
}: {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  label: string;
}) {
  function toggleTheme() {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    onThemeChange(nextTheme);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-full text-muted transition-colors duration-150 hover:bg-ink/[0.055] hover:text-ink dark:hover:bg-white/[0.08]"
    >
      <span className="relative grid h-5 w-5 place-items-center" aria-hidden="true">
        <Sun className={`absolute h-[19px] w-[19px] transition-[transform,opacity] duration-200 ease-apple ${theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-75 opacity-0'}`} strokeWidth={1.8} />
        <Moon className={`absolute h-[19px] w-[19px] transition-[transform,opacity] duration-200 ease-apple ${theme === 'light' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-75 opacity-0'}`} strokeWidth={1.8} />
      </span>
    </button>
  );
}
