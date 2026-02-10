import { ReactNode } from 'react';
import { useInView } from '../../hooks/useInView';

interface RevealProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-in' | 'fade-in-up' | 'scale-in';
  delay?: number;
}

export function Reveal({ children, className = '', animation = 'fade-in-up', delay = 0 }: RevealProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });

  const animationClass = isInView ? `animate-${animation}` : 'opacity-0';
  const delayStyle = delay > 0 ? { animationDelay: `${delay}ms` } : undefined;

  return (
    <div ref={ref} className={`${animationClass} ${className}`} style={delayStyle}>
      {children}
    </div>
  );
}
