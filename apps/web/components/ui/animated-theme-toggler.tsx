'use client';

import { Moon, Sun } from 'lucide-react';
import { flushSync } from 'react-dom';
import { useRef } from 'react';

type Theme = 'light' | 'dark';

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> };
};

export function AnimatedThemeToggler({
  theme,
  onThemeChange,
  label,
}: {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  label: string;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  function applyTheme(nextTheme: Theme) {
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    onThemeChange(nextTheme);
  }

  async function toggleTheme() {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    const button = buttonRef.current;
    const doc = document as ViewTransitionDocument;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!button || !doc.startViewTransition || reduceMotion) {
      applyTheme(nextTheme);
      return;
    }

    const { left, top, width, height } = button.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );
    const transition = doc.startViewTransition(() => {
      flushSync(() => applyTheme(nextTheme));
    });

    await transition.ready;
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      {
        duration: 420,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        pseudoElement: '::view-transition-new(root)',
      } as KeyframeAnimationOptions,
    );
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-full text-muted transition-colors hover:bg-ink/[0.055] hover:text-ink dark:hover:bg-white/[0.08]"
    >
      <span className="relative grid h-5 w-5 place-items-center" aria-hidden="true">
        <Sun className={`absolute h-[19px] w-[19px] transition-all duration-300 ${theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'}`} strokeWidth={1.8} />
        <Moon className={`absolute h-[19px] w-[19px] transition-all duration-300 ${theme === 'light' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-50 opacity-0'}`} strokeWidth={1.8} />
      </span>
    </button>
  );
}
