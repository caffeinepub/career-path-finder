import { forwardRef } from 'react';
import { Section } from '../layout/Section';
import { CareerSurvey } from '../survey/CareerSurvey';
import { useCareerFlow } from '../../state/careerFlowStore';
import { Reveal } from '../motion/Reveal';

export const SurveySection = forwardRef<HTMLElement>((props, ref) => {
  const { setSurveyAnswers, setSurveyCompleted } = useCareerFlow();

  return (
    <Section
      ref={ref}
      id="survey"
      title="Career Discovery Survey"
      subtitle="Help us understand your interests, skills, and preferences"
      variant="muted"
      decoration="texture"
    >
      <Reveal animation="fade-in-up">
        <CareerSurvey
          onComplete={(answers) => {
            setSurveyAnswers(answers);
            setSurveyCompleted(true);
          }}
        />
      </Reveal>
    </Section>
  );
});

SurveySection.displayName = 'SurveySection';
