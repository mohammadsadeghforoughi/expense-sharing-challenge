import { ArrowRight } from 'lucide-react';
import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export const InteractiveHoverButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }>(function InteractiveHoverButton({ children, className = '', ...props }, ref) {
  return (
    <button
      ref={ref}
      className={`interactive-hover group relative inline-flex h-12 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-accent px-6 font-medium text-white shadow-[0_8px_24px_-12px_rgba(34,113,246,0.85)] ${className}`}
      {...props}
    >
      <span className="absolute start-[1.15rem] h-2 w-2 rounded-full bg-white transition-transform duration-500 ease-apple group-hover:scale-[35]" aria-hidden="true" />
      <span className="relative flex items-center gap-2 transition-all duration-300 ease-apple group-hover:translate-x-8 group-hover:opacity-0 rtl:group-hover:-translate-x-8">
        {children}
      </span>
      <span className="absolute flex translate-x-8 items-center gap-2 text-accent opacity-0 transition-all duration-300 ease-apple group-hover:translate-x-0 group-hover:opacity-100 rtl:-translate-x-8 rtl:group-hover:translate-x-0">
        <span>{children}</span>
        <ArrowRight className="h-4 w-4 rtl:rotate-180" strokeWidth={2} />
      </span>
    </button>
  );
});
