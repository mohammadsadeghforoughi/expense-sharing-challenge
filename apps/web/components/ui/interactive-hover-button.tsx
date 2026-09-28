import { ArrowRight } from 'lucide-react';
import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export const InteractiveHoverButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }>(function InteractiveHoverButton({ children, className = '', ...props }, ref) {
  return (
    <button
      ref={ref}
      className={`group relative inline-flex h-12 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-accent px-6 font-medium text-white shadow-[0_8px_24px_-12px_rgba(34,113,246,0.85)] transition-[transform,background-color,box-shadow] duration-200 ease-apple hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-[0_12px_28px_-12px_rgba(34,113,246,0.95)] active:translate-y-0 ${className}`}
      {...props}
    >
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-apple group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" strokeWidth={2} aria-hidden="true" />
    </button>
  );
});
