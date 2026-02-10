import { ArrowRight, Target, MessageSquare, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface HomeSectionProps {
  onStartSurvey: () => void;
}

export function HomeSection({ onStartSurvey }: HomeSectionProps) {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Decorative Background Layers */}
      <div className="absolute inset-0 -z-10">
        {/* Paper texture base */}
        <img
          src="/assets/generated/beige-paper-texture.dim_2000x2000.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        {/* Corner decorations */}
        <img
          src="/assets/generated/beige-navy-corners.dim_1600x600.png"
          alt=""
          className="absolute top-0 left-0 right-0 w-full h-auto opacity-20"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6 animate-scale-in">
            <img
              src="/assets/generated/career-path-finder-logo.dim_512x512.png"
              alt="Career Path Finder"
              className="h-20 w-20 md:h-24 md:w-24"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-chart-1 to-primary bg-clip-text text-transparent animate-fade-in-up animation-delay-100">
            Career Path Finder
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-6 font-medium animate-fade-in-up animation-delay-200">
            AI-Powered Career Guidance for Smarter Decisions
          </p>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-300">
            Discover your ideal career path through our intelligent survey system and personalized AI assistant. We
            analyze your interests, skills, and preferences to recommend careers that truly match your profile.
          </p>
          <div className="animate-fade-in-up animation-delay-400">
            <Button 
              size="lg" 
              onClick={onStartSurvey} 
              className="gap-2 text-lg px-8 py-6 transition-all duration-250 hover:scale-[1.02] hover:shadow-soft-lg"
            >
              Find My Career Path
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <Card className="p-6 text-center transition-all duration-250 hover:shadow-soft-lg hover:-translate-y-0.5 animate-fade-in-up animation-delay-100">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-primary/10 transition-all duration-250 hover:scale-105 hover:bg-primary/15">
                <Target className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2">Personalized Survey</h3>
            <p className="text-sm text-muted-foreground">
              Answer targeted questions about your interests, skills, and work preferences
            </p>
          </Card>

          <Card className="p-6 text-center transition-all duration-250 hover:shadow-soft-lg hover:-translate-y-0.5 animate-fade-in-up animation-delay-200">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-chart-1/10 transition-all duration-250 hover:scale-105 hover:bg-chart-1/15">
                <MessageSquare className="h-6 w-6 text-chart-1" />
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2">AI Career Assistant</h3>
            <p className="text-sm text-muted-foreground">
              Chat with our intelligent assistant to clarify your goals and explore options
            </p>
          </Card>

          <Card className="p-6 text-center transition-all duration-250 hover:shadow-soft-lg hover:-translate-y-0.5 animate-fade-in-up animation-delay-300">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-chart-2/10 transition-all duration-250 hover:scale-105 hover:bg-chart-2/15">
                <Sparkles className="h-6 w-6 text-chart-2" />
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2">Smart Recommendations</h3>
            <p className="text-sm text-muted-foreground">
              Receive tailored career suggestions with detailed explanations and requirements
            </p>
          </Card>
        </div>
      </div>

      {/* Wave divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0 -z-5">
        <img
          src="/assets/generated/navy-wave-divider.dim_1600x200.png"
          alt=""
          className="w-full h-auto opacity-15"
        />
      </div>
    </section>
  );
}
