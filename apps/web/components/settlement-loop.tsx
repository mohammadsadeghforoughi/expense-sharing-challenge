import { Check } from 'lucide-react';
import type { Locale } from '@/lib/types';

export function SettlementLoop({ compact = false, locale = 'fa' }: { compact?: boolean; locale?: Locale }) {
  if (compact) {
    return (
      <div className="settlement-loader relative h-36 w-36" aria-hidden="true">
        <span className="absolute inset-[2.15rem] rounded-full bg-accent/10 blur-xl" />
        <span className="absolute inset-[3.15rem] grid place-items-center rounded-full bg-accent text-sm font-semibold text-white shadow-[0_10px_28px_-10px_rgba(34,113,246,0.9)]">$0</span>
        <span className="loader-orbit absolute inset-2 rounded-full border border-dashed border-line">
          <span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-[#5E8BFF] ring-4 ring-canvas" />
        </span>
        <span className="loader-orbit loader-orbit-reverse absolute inset-5 rounded-full border border-line/70">
          <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#38A87A] ring-4 ring-canvas" />
        </span>
      </div>
    );
  }

  return (
    <div className="settlement-visual relative h-[280px] w-[340px] max-w-full overflow-hidden rounded-[2rem] border border-white/70 bg-surface/65 shadow-[0_30px_80px_-38px_rgba(34,113,246,0.55)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.045]" aria-hidden="true">
      <div className="absolute -start-14 -top-16 h-48 w-48 rounded-full bg-[#5E8BFF]/20 blur-3xl" />
      <div className="absolute -bottom-20 -end-10 h-52 w-52 rounded-full bg-[#38A87A]/15 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgb(var(--accent)/0.08),transparent_38%)]" />

      <svg viewBox="0 0 340 280" className="absolute inset-0 h-full w-full overflow-visible fill-none">
        <defs>
          <linearGradient id="flow-line" x1="30" y1="30" x2="310" y2="250" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5E8BFF" stopOpacity="0.14" />
            <stop offset="0.5" stopColor="#2E7CF6" stopOpacity="0.75" />
            <stop offset="1" stopColor="#38A87A" stopOpacity="0.14" />
          </linearGradient>
          <filter id="token-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <path id="top-flow" d="M62 140 C78 64 118 42 170 42 C222 42 262 65 278 140" />
          <path id="bottom-flow" d="M278 140 C260 216 220 238 170 238 C118 238 80 216 62 140" />
          <path id="cross-flow" d="M62 140 C122 124 212 158 278 140" />
        </defs>

        <circle cx="170" cy="140" r="91" className="stroke-line/70" strokeDasharray="3 8" />
        <circle cx="170" cy="140" r="112" className="orbit-ring stroke-accent/15" strokeDasharray="1 13" strokeLinecap="round" />
        <use href="#top-flow" stroke="url(#flow-line)" strokeWidth="1.5" />
        <use href="#bottom-flow" stroke="url(#flow-line)" strokeWidth="1.5" />
        <use href="#cross-flow" className="stroke-line" strokeWidth="1" strokeDasharray="4 6" />

        <g className="flow-particle" filter="url(#token-glow)">
          <circle r="5" fill="#5E8BFF" />
          <animateMotion dur="4.8s" repeatCount="indefinite"><mpath href="#top-flow" /></animateMotion>
        </g>
        <g className="flow-particle" filter="url(#token-glow)">
          <circle r="4" fill="#38A87A" />
          <animateMotion dur="5.6s" begin="-2.7s" repeatCount="indefinite"><mpath href="#bottom-flow" /></animateMotion>
        </g>
        <g className="flow-particle" filter="url(#token-glow)">
          <circle r="3.5" fill="#FF7A64" />
          <animateMotion dur="3.9s" begin="-1.2s" repeatCount="indefinite"><mpath href="#cross-flow" /></animateMotion>
        </g>

        <NetworkNode x="62" y="140" initials="A" color="#FF7A64" />
        <NetworkNode x="170" y="42" initials="B" color="#5E8BFF" />
        <NetworkNode x="278" y="140" initials="D" color="#38A87A" />
        <NetworkNode x="170" y="238" initials="C" color="#9B72E8" />
      </svg>

      <div className="settlement-core absolute start-1/2 top-1/2 grid h-[106px] w-[106px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/80 bg-surface/85 text-center shadow-[0_18px_45px_-24px_rgba(34,113,246,0.9)] backdrop-blur-xl dark:border-white/15 dark:bg-[#1c1c1e]/85 rtl:translate-x-1/2">
        <div>
          <span className="mx-auto grid h-5 w-5 place-items-center rounded-full bg-emerald-500 text-white"><Check className="h-3 w-3" strokeWidth={3} /></span>
          <strong className="mt-1.5 block text-xl font-semibold tabular-nums tracking-[-0.03em]">$0</strong>
          <span className="block text-[9px] font-semibold tracking-[0.12em] text-muted">{locale === 'fa' ? 'تسویه' : 'settled'}</span>
        </div>
      </div>

      <span dir="ltr" className="float-amount absolute start-5 top-7 rounded-full border border-line/80 bg-surface/80 px-3 py-1.5 text-[11px] font-semibold tabular-nums shadow-sm backdrop-blur">+$45</span>
      <span dir="ltr" className="float-amount float-amount-two absolute bottom-6 end-5 rounded-full border border-line/80 bg-surface/80 px-3 py-1.5 text-[11px] font-semibold tabular-nums shadow-sm backdrop-blur">−$35</span>
    </div>
  );
}

function NetworkNode({ x, y, initials, color }: { x: string; y: string; initials: string; color: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="22" fill="rgb(var(--canvas))" stroke="rgb(var(--line))" />
      <circle r="17" fill={color} />
      <circle r="17" fill="none" stroke="white" strokeOpacity="0.3" />
      <text x="0" y="1" fill="white" fontSize="10" fontWeight="700" textAnchor="middle" dominantBaseline="middle">{initials}</text>
    </g>
  );
}
