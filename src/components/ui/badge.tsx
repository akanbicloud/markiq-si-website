import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-[var(--blue)] text-[#04101F] font-mono',
        secondary:
          'border-transparent bg-[var(--surface-2)] text-[var(--text)]',
        outline:
          'border-[var(--line)] text-[var(--muted)]',
        up:
          'border-transparent bg-[rgba(61,220,151,0.15)] text-[var(--up)] border-[rgba(61,220,151,0.3)]',
        down:
          'border-transparent bg-[rgba(255,138,91,0.15)] text-[var(--down)] border-[rgba(255,138,91,0.3)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
