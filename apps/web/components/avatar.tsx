import type { User } from '@/lib/types';

export function Avatar({ user, size = 'md' }: { user: User; size?: 'sm' | 'md' }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full font-semibold text-white ${size === 'sm' ? 'h-8 w-8 text-[10px]' : 'h-10 w-10 text-xs'}`}
      style={{ backgroundColor: user.color }}
      aria-hidden="true"
    >
      {user.initials}
    </span>
  );
}
