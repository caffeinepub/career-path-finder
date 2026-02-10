import { Heart, Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function FooterSection() {
  const appIdentifier = typeof window !== 'undefined' ? encodeURIComponent(window.location.hostname) : 'career-path-finder';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-muted/30 border-t">
      {/* Decorative wave at top */}
      <div className="absolute top-0 left-0 right-0 transform rotate-180">
        <img
          src="/assets/generated/navy-wave-divider.dim_1600x200.png"
          alt=""
          className="w-full h-auto opacity-10"
        />
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl relative">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-3">Career Path Finder</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered career guidance helping you make smarter decisions about your professional future.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">About</h3>
            <p className="text-sm text-muted-foreground">
              This platform combines intelligent surveys with conversational AI to provide personalized career
              recommendations based on your unique profile and preferences.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Contact</h3>
            <a
              href="mailto:info@careerpathfinder.example"
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors duration-200"
            >
              <Mail className="h-4 w-4" />
              info@careerpathfinder.example
            </a>
          </div>
        </div>

        <Separator className="mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p className="text-center md:text-left">
            <strong>Disclaimer:</strong> Career suggestions are for guidance purposes only.
          </p>
          <p className="flex items-center gap-1">
            Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline font-medium transition-colors duration-200"
            >
              caffeine.ai
            </a>
          </p>
        </div>

        <div className="text-center mt-4 text-xs text-muted-foreground">
          © {currentYear} Career Path Finder. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
