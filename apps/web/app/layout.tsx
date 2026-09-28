import type { Metadata } from 'next';
import { Header } from '@/components/header';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Settle — Shared expenses',
    template: '%s — Settle',
  },
  description: 'A minimal expense-sharing ledger for recording and settling directional expenses.',
};

const themeScript = `
  (() => {
    const theme = localStorage.getItem('settle-theme') || 'light';
    const locale = localStorage.getItem('settle-locale') || 'fa';
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr';
  })();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
