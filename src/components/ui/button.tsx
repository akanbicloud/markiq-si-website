import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[12px] text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer select-none',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--amber)] text-[#1A1203] font-semibold hover:brightness-105 active:scale-[0.98]',
        secondary:
          'bg-[var(--button)] text-white font-medium hover:brightness-110 active:scale-[0.98]',
        outline:
          'border border-[var(--line-strong)] bg-transparent text-[var(--text)] hover:bg-[var(--surface)]',
        ghost:
          'text-[var(--text)] hover:bg-[var(--surface)] hover:text-white',
        link: 'text-[var(--blue-soft)] underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        default: 'h-12 px-6 py-3 min-h-[48px]',
        sm: 'h-9 rounded-[8px] px-3 text-xs min-h-[36px]',
        lg: 'h-14 rounded-[12px] px-8 text-base min-h-[52px]',
        icon: 'h-11 w-11 min-h-[44px] min-w-[44px] rounded-[10px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
