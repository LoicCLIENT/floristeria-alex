import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: boolean;
}

export default function Card({
  children,
  className = '',
  hover = true,
  padding = false,
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-soft overflow-hidden transition-all duration-200 ${
        hover ? 'hover:shadow-soft-lg' : ''
      } ${padding ? 'p-6' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
