import type { ReactNode, ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const BASE =
  'inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

const STYLES: Record<ButtonVariant, string> = {
  primary: 'bg-purple-600 text-white hover:bg-purple-700',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
};

export function Button({
  children,
  variant = 'primary',
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button className={`${BASE} ${STYLES[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}