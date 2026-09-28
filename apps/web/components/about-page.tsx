'use client';

import { ArrowUpRight, Boxes, Cloud, Code2, Database, FileJson, Layers3 } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Locale } from '@/lib/types';

const copy = {
  en: {
    title: 'A small system with clear boundaries.',
    intro: 'This code challenge focuses on one complete path: record a directional expense, persist it, and return the correctly netted balance. The implementation stays intentionally compact so the important decisions are easy to inspect.',
    architecture: 'Architecture',
    architectureText: 'The browser talks to a Next.js application on a single public origin. Next.js proxies API requests to a private NestJS service, which owns validation, balance calculation, and the SQLite database.',
    web: 'Web interface',
    webText: 'Next.js renders the responsive bilingual interface and keeps interaction state close to the page.',
    api: 'Application API',
    apiText: 'NestJS exposes small REST endpoints with validation and generated OpenAPI documentation.',
    data: 'Data layer',
    dataText: 'SQLite stores seeded users and expenses in a persistent Docker volume. Money is stored as integer cents.',
    stack: 'Stack',
    deployment: 'Deployment',
    deploymentText: 'The deployed application runs as two Docker Compose services behind Cloudflare. The web service is the only public entry point; the API remains on the private Compose network. This project was implemented with Codex sol-5.6.',
    swagger: 'Explore the API',
    swaggerText: 'Swagger documents every endpoint and lets reviewers call the API directly from the browser.',
    openSwagger: 'Open Swagger UI',
    tradeoffs: 'Deliberate trade-offs',
    tradeoffList: [
      'Pairwise netting is computed on read; this is simple and correct for the expected data size.',
      'SQLite and a single API instance keep deployment reproducible without extra infrastructure.',
      'Authentication, groups, split rules, editing, and deletion are outside this focused brief.',
    ],
    flow: ['Browser', 'Next.js', 'NestJS API', 'SQLite'],
  },
  fa: {
    title: 'سامانه‌ای کوچک با مرزهایی روشن.',
    intro: 'این چالش کدنویسی روی یک مسیر کامل تمرکز دارد: ثبت یک هزینه جهت‌دار، ذخیره آن و نمایش بدهی خالص درست. پیاده‌سازی عمداً جمع‌وجور مانده تا تصمیم‌های اصلی به‌سادگی قابل بررسی باشند.',
    architecture: 'معماری',
    architectureText: 'مرورگر از یک مبدأ عمومی با برنامه Next.js ارتباط دارد. درخواست‌های API از طریق Next.js به سرویس خصوصی NestJS می‌رسند؛ سرویسی که اعتبارسنجی، محاسبه بدهی و پایگاه داده SQLite را مدیریت می‌کند.',
    web: 'رابط وب',
    webText: 'Next.js رابط واکنش‌گرا و دوزبانه را نمایش می‌دهد و وضعیت تعامل را نزدیک به صفحه نگه می‌دارد.',
    api: 'رابط برنامه‌نویسی',
    apiText: 'NestJS چند مسیر REST کوچک با اعتبارسنجی و مستندات OpenAPI تولیدشده ارائه می‌دهد.',
    data: 'لایه داده',
    dataText: 'SQLite کاربران اولیه و هزینه‌ها را در یک volume پایدار Docker نگه می‌دارد. مبلغ‌ها به‌شکل عدد صحیح سنت ذخیره می‌شوند.',
    stack: 'فناوری‌ها',
    deployment: 'استقرار',
    deploymentText: 'نسخه مستقرشده با دو سرویس Docker Compose پشت Cloudflare اجرا می‌شود. تنها سرویس وب در دسترس عمومی است و API در شبکه خصوصی Compose باقی می‌ماند. این پروژه با Codex sol-5.6 پیاده‌سازی شده است.',
    swagger: 'بررسی API',
    swaggerText: 'Swagger همه مسیرها را مستند می‌کند و امکان فراخوانی مستقیم API از مرورگر را به ارزیاب می‌دهد.',
    openSwagger: 'باز کردن Swagger',
    tradeoffs: 'انتخاب‌های آگاهانه',
    tradeoffList: [
      'خالص‌سازی دوطرفه هنگام خواندن محاسبه می‌شود؛ روشی ساده و درست برای اندازه داده مورد انتظار.',
      'SQLite و یک نمونه API، استقرار را بدون زیرساخت اضافه قابل بازتولید نگه می‌دارند.',
      'احراز هویت، گروه‌ها، تقسیم چندنفره، ویرایش و حذف عمداً خارج از محدوده این تمرین هستند.',
    ],
    flow: ['مرورگر', 'Next.js', 'API با NestJS', 'SQLite'],
  },
} as const;

export function AboutPage() {
  const [locale, setLocale] = useState<Locale>('en');
  const t = copy[locale];

  useEffect(() => {
    setLocale(localStorage.getItem('settle-locale') === 'fa' ? 'fa' : 'en');
    const onLocale = (event: Event) => setLocale((event as CustomEvent<Locale>).detail);
    window.addEventListener('settle-locale', onLocale);
    return () => window.removeEventListener('settle-locale', onLocale);
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-5 pb-20 pt-14 sm:px-8 sm:pt-20">
      <section className="max-w-3xl border-b border-line pb-12 sm:pb-16">
        <h1 className="text-balance text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.04em]">{t.title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">{t.intro}</p>
      </section>

      <section className="py-12 sm:py-16">
        <h2 className="text-2xl font-semibold tracking-[-0.025em]">{t.architecture}</h2>
        <p className="mt-4 max-w-2xl leading-7 text-muted">{t.architectureText}</p>
        <div className="mt-8 flex flex-wrap items-center gap-2" aria-label="System flow">
          {t.flow.map((item, index) => (
            <div key={item} className="flex items-center gap-2">
              <span className="rounded-full bg-surface px-4 py-2.5 text-sm font-medium shadow-[0_4px_16px_-12px_rgba(0,0,0,0.45)]">{item}</span>
              {index < t.flow.length - 1 && <span className="text-muted" aria-hidden="true">→</span>}
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-x-10 gap-y-8 border-y border-line py-8 md:grid-cols-3">
          <InfoBlock icon={Layers3} title={t.web} text={t.webText} />
          <InfoBlock icon={Code2} title={t.api} text={t.apiText} />
          <InfoBlock icon={Database} title={t.data} text={t.dataText} />
        </div>
      </section>

      <section className="grid gap-12 border-b border-line pb-12 sm:pb-16 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.025em]">{t.stack}</h2>
          <ul className="mt-5 space-y-3 text-muted">
            {['Next.js 16 + React 19', 'Tailwind CSS', 'NestJS', 'SQLite', 'Docker Compose', 'Swagger / OpenAPI'].map((item) => (
              <li key={item} className="flex items-center gap-3"><Boxes className="h-4 w-4 text-accent" />{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-[-0.025em]"><Cloud className="h-6 w-6 text-accent" />{t.deployment}</h2>
          <p className="mt-5 leading-7 text-muted">{t.deploymentText}</p>
        </div>
      </section>

      <section className="grid gap-12 py-12 sm:py-16 md:grid-cols-2">
        <div>
          <FileJson className="h-7 w-7 text-accent" />
          <h2 className="mt-4 text-2xl font-semibold tracking-[-0.025em]">{t.swagger}</h2>
          <p className="mt-4 leading-7 text-muted">{t.swaggerText}</p>
          <a href="/api/docs" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-surface transition-transform duration-300 ease-apple hover:-translate-y-0.5">
            {t.openSwagger}<ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.025em]">{t.tradeoffs}</h2>
          <ul className="mt-5 space-y-4 text-sm leading-6 text-muted">
            {t.tradeoffList.map((item) => <li key={item} className="border-s border-line ps-4">{item}</li>)}
          </ul>
        </div>
      </section>
    </main>
  );
}

function InfoBlock({ icon: Icon, title, text }: { icon: typeof Layers3; title: string; text: string }) {
  return (
    <div>
      <Icon className="h-5 w-5 text-accent" />
      <h3 className="mt-3 font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
    </div>
  );
}
