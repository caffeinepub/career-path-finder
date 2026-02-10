import { forwardRef } from 'react';
import { Section } from '../layout/Section';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, GitBranch, MessageCircle } from 'lucide-react';
import { Reveal } from '../motion/Reveal';

export const TechnologyExplanationSection = forwardRef<HTMLElement>((props, ref) => {
  return (
    <Section
      ref={ref}
      id="about"
      title="How It Works"
      subtitle="Understanding our career guidance technology"
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          <Reveal animation="fade-in-up" delay={0}>
            <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardContent className="pt-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10 transition-transform duration-300 hover:scale-110">
                    <GitBranch className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold mb-2">Rule-Based Logic</h3>
                <p className="text-sm text-muted-foreground">
                  Our system uses carefully designed rules to match your responses with suitable career paths, ensuring
                  consistent and explainable recommendations.
                </p>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal animation="fade-in-up" delay={100}>
            <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardContent className="pt-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-chart-1/10 transition-transform duration-300 hover:scale-110">
                    <Brain className="h-6 w-6 text-chart-1" />
                  </div>
                </div>
                <h3 className="font-semibold mb-2">Multi-Criteria Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  We evaluate multiple factors including your interests, skills, work preferences, and learning style to
                  provide comprehensive career matches.
                </p>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal animation="fade-in-up" delay={200}>
            <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardContent className="pt-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-chart-2/10 transition-transform duration-300 hover:scale-110">
                    <MessageCircle className="h-6 w-6 text-chart-2" />
                  </div>
                </div>
                <h3 className="font-semibold mb-2">AI-Assisted Guidance</h3>
                <p className="text-sm text-muted-foreground">
                  Our conversational AI helps you explore career options, ask questions, and gain deeper insights into
                  potential career paths.
                </p>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </Section>
  );
});

TechnologyExplanationSection.displayName = 'TechnologyExplanationSection';
