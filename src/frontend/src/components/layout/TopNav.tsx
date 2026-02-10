import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TopNavProps {
  onNavigate: (section: 'home' | 'survey' | 'chat' | 'recommendations' | 'about') => void;
}

export function TopNav({ onNavigate }: TopNavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', section: 'home' as const },
    { label: 'Survey', section: 'survey' as const },
    { label: 'Assistant', section: 'chat' as const },
    { label: 'Results', section: 'recommendations' as const },
    { label: 'About', section: 'about' as const },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-250 ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-soft border-b' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 font-semibold text-lg transition-all duration-200 hover:opacity-80"
          >
            <img src="/assets/generated/career-path-finder-logo.dim_512x512.png" alt="Logo" className="h-8 w-8" />
            <span className="hidden sm:inline">Career Path Finder</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.section}
                variant="ghost"
                size="sm"
                onClick={() => onNavigate(item.section)}
                className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:bg-accent/60"
              >
                {item.label}
              </Button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden transition-all duration-200 hover:bg-accent/60"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t animate-fade-in">
            <div className="flex flex-col gap-2">
              {navItems.map((item, idx) => (
                <Button
                  key={item.section}
                  variant="ghost"
                  onClick={() => {
                    onNavigate(item.section);
                    setIsMobileMenuOpen(false);
                  }}
                  className="justify-start text-muted-foreground hover:text-foreground transition-all duration-200 hover:bg-accent/60 animate-slide-in-left"
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
