'use client';

import { Languages, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getMessages } from '@/lib/i18n';
import type { Locale } from '@/lib/types';

export function Header() {
  const pathname = usePathname();
  const [locale, setLocale] = useState<Locale>('en');
  const [dark, setDark] = useState(false);
  const t = getMessages(locale);

  useEffect(() => {
    const savedLocale = localStorage.getItem('settle-locale') as Locale | null;
    const nextLocale = savedLocale === 'fa' ? 'fa' : 'en';
    setLocale(nextLocale);
    setDark(document.documentElement.classList.contains('dark'));
    document.documentElement.lang = nextLocale;
    document.documentElement.dir = nextLocale === 'fa' ? 'rtl' : 'ltr';
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('settle-theme', next ? 'dark' : 'light');
  }

  function toggleLocale() {
    const next: Locale = locale === 'en' ? 'fa' : 'en';
    setLocale(next);
    localStorage.setItem('settle-locale', next);
    document.documentElement.lang = next;
    document.documentElement.dir = next === 'fa' ? 'rtl' : 'ltr';
    window.dispatchEvent(new CustomEvent('settle-locale', { detail: next }));
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-canvas/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5 rounded-lg font-semibold tracking-[-0.02em]">
          <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-ink text-surface transition-transform duration-300 ease-apple group-hover:scale-[1.04]" aria-hidden="true">
            <svg viewBox="0 0 20 20" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
              <path d="M4 7.25h12M4 12.75h12" />
              <path d="m7 4-3 3.25L7 10M13 10l3 2.75L13 16" />
            </svg>
          </span>
          <span>{t.appName}</span>
        </Link>

        <div className="flex items-center gap-1.5">
          <nav aria-label="Primary" className="me-1 hidden items-center rounded-full bg-ink/[0.045] p-1 dark:bg-white/[0.06] sm:flex">
            <Link
              href="/"
              className={`rounded-full px-4 py-1.5 text-sm transition-colors ${pathname === '/' ? 'bg-surface text-ink shadow-sm' : 'text-muted hover:text-ink'}`}
            >
              {t.expenses}
            </Link>
            <Link
              href="/about"
              className={`rounded-full px-4 py-1.5 text-sm transition-colors ${pathname === '/about' ? 'bg-surface text-ink shadow-sm' : 'text-muted hover:text-ink'}`}
            >
              {t.about}
            </Link>
          </nav>
          <button
            type="button"
            onClick={toggleLocale}
            aria-label={t.switchLanguage}
            className="grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-ink/[0.055] hover:text-ink dark:hover:bg-white/[0.08]"
          >
            <Languages className="h-[19px] w-[19px]" strokeWidth={1.8} />
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t.switchTheme}
            className="grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-ink/[0.055] hover:text-ink dark:hover:bg-white/[0.08]"
          >
            {dark ? <Sun className="h-[19px] w-[19px]" strokeWidth={1.8} /> : <Moon className="h-[19px] w-[19px]" strokeWidth={1.8} />}
          </button>
        </div>
      </div>
      <nav aria-label="Mobile primary" className="mx-auto flex max-w-6xl gap-5 px-5 pb-2 text-sm sm:hidden">
        <Link href="/" className={pathname === '/' ? 'text-ink' : 'text-muted'}>{t.expenses}</Link>
        <Link href="/about" className={pathname === '/about' ? 'text-ink' : 'text-muted'}>{t.about}</Link>
      </nav>
    </header>
  );
}
