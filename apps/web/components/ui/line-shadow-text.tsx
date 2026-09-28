import type { ReactNode } from 'react';

export function LineShadowText({ children }: { children: ReactNode }) {
  return (
    <span className="line-shadow-text relative z-0 inline-block">
      {children}
    </span>
  );
}
