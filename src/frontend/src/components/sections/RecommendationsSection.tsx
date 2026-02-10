import { forwardRef } from 'react';
import { Section } from '../layout/Section';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Sparkles } from 'lucide-react';
import { RecommendationCard } from '../recommendations/RecommendationCard';
import { useCareerFlow } from '../../state/careerFlowStore';
import { useCareerRecommendations } from '../../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { Reveal } from '../motion/Reveal';

export const RecommendationsSection = forwardRef<HTMLElement>((props, ref) => {
  const { surveyCompleted, chatStarted, chatSkipped, surveyAnswers } = useCareerFlow();

  // Enhanced scoring based on expanded survey answers
  const computeScores = () => {
    if (!surveyAnswers) return { itSkills: 5, mathSkills: 5 };

    let itSkills = 5;
    let mathSkills = 5;

    // Base scoring from interests
    if (surveyAnswers.interests.includes('technology')) itSkills += 2;
    if (surveyAnswers.interests.includes('engineering')) mathSkills += 2;

    // Scoring from skills
    if (surveyAnswers.skills.includes('analytical')) mathSkills += 1;
    if (surveyAnswers.skills.includes('technical')) itSkills += 2;
    if (surveyAnswers.skills.includes('problem-solving')) {
      itSkills += 1;
      mathSkills += 1;
    }

    // Scoring from interest activities
    if (surveyAnswers.interestActivities.includes('analyzing-data')) {
      mathSkills += 1;
      itSkills += 1;
    }
    if (surveyAnswers.interestActivities.includes('building-creating')) {
      itSkills += 1;
    }

    // Scoring from work values
    if (surveyAnswers.workValues.includes('creativity')) {
      // Slightly reduce pure tech/math focus for creative roles
      itSkills = Math.max(4, itSkills - 1);
    }
    if (surveyAnswers.workValues.includes('impact')) {
      // Healthcare/social work alignment
      mathSkills = Math.max(4, mathSkills - 1);
    }

    // Cap scores at 8
    return {
      itSkills: Math.min(8, itSkills),
      mathSkills: Math.min(8, mathSkills),
    };
  };

  const { itSkills, mathSkills } = computeScores();

  const canShowRecommendations = surveyCompleted && (chatStarted || chatSkipped);

  const { data: recommendations = [], isLoading, isError } = useCareerRecommendations(
    itSkills,
    mathSkills,
    canShowRecommendations
  );

  if (!surveyCompleted) {
    return (
      <Section
        ref={ref}
        id="recommendations"
        title="Your Career Recommendations"
        subtitle="Complete the survey to receive personalized career suggestions"
        variant="muted"
      >
        <Reveal animation="fade-in-up">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-12 pb-12 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-muted">
                  <Sparkles className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>
              <p className="text-muted-foreground">
                Complete the survey and chat with our assistant to unlock your personalized career recommendations.
              </p>
            </CardContent>
          </Card>
        </Reveal>
      </Section>
    );
  }

  if (!canShowRecommendations) {
    return (
      <Section
        ref={ref}
        id="recommendations"
        title="Your Career Recommendations"
        subtitle="Chat with our assistant or skip to view recommendations"
        variant="muted"
      >
        <Reveal animation="fade-in-up">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-12 pb-12 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-muted">
                  <Sparkles className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>
              <p className="text-muted-foreground">
                Please chat with our Career Assistant or skip to view your recommendations.
              </p>
            </CardContent>
          </Card>
        </Reveal>
      </Section>
    );
  }

  return (
    <Section
      ref={ref}
      id="recommendations"
      title="Your Career Recommendations"
      subtitle="Based on your survey responses and profile"
      variant="muted"
    >
      <div className="max-w-4xl mx-auto">
        {isLoading && (
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-fade-in">
                <CardContent className="pt-6 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {isError && (
          <Reveal animation="fade-in-up">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Failed to load recommendations. Please try again.</AlertDescription>
            </Alert>
          </Reveal>
        )}

        {!isLoading && !isError && recommendations.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((rec, idx) => (
              <Reveal key={idx} animation="fade-in-up" delay={idx * 100}>
                <RecommendationCard recommendation={rec} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
});

RecommendationsSection.displayName = 'RecommendationsSection';
