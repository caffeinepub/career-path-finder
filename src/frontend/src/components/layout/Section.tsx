import { forwardRef, type ReactNode } from 'react';
import { Reveal } from '../motion/Reveal';

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'muted';
  decoration?: 'texture' | 'corners' | 'wave' | 'none';
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ id, title, subtitle, children, className = '', variant = 'default', decoration = 'none' }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        className={`relative py-16 md:py-24 ${variant === 'muted' ? 'bg-muted/30' : ''} ${className}`}
      >
        {/* Optional decorative backgrounds */}
        {decoration === 'texture' && (
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <img
              src="/assets/generated/beige-paper-texture.dim_2000x2000.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
          </div>
        )}
        {decoration === 'corners' && (
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <img
              src="/assets/generated/beige-navy-corners.dim_1600x600.png"
              alt=""
              className="absolute top-0 left-0 right-0 w-full h-auto opacity-15"
            />
          </div>
        )}
        {decoration === 'wave' && (
          <div className="absolute bottom-0 left-0 right-0 -z-10">
            <img
              src="/assets/generated/navy-wave-divider.dim_1600x200.png"
              alt=""
              className="w-full h-auto opacity-15"
            />
          </div>
        )}

        <div className="container mx-auto px-4 max-w-6xl">
          {(title || subtitle) && (
            <Reveal animation="fade-in-up">
              <div className="text-center mb-12">
                {title && <h2 className="text-3xl md:text-4xl font-bold mb-3">{title}</h2>}
                {subtitle && <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
              </div>
            </Reveal>
          )}
          {children}
        </div>
      </section>
    );
  }
);

Section.displayName = 'Section';
