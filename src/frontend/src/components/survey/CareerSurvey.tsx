import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { SurveyProgress } from './SurveyProgress';
import { InterestsStep } from './steps/InterestsStep';
import { SkillsStep } from './steps/SkillsStep';
import { WorkEnvironmentStep } from './steps/WorkEnvironmentStep';
import { LearningStyleStep } from './steps/LearningStyleStep';
import { PersonalityStep } from './steps/PersonalityStep';
import { InterestActivitiesStep } from './steps/InterestActivitiesStep';
import { WorkValuesStep } from './steps/WorkValuesStep';
import type { SurveyAnswers } from '../../state/careerFlowStore';

interface CareerSurveyProps {
  onComplete: (answers: SurveyAnswers) => void;
}

export function CareerSurvey({ onComplete }: CareerSurveyProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<SurveyAnswers>({
    interests: [],
    skills: [],
    workEnvironment: '',
    learningStyle: '',
    personalityTraits: [],
    interestActivities: [],
    workValues: [],
  });
  const [isCompleted, setIsCompleted] = useState(false);

  const totalSteps = 7;

  const updateAnswers = (field: keyof SurveyAnswers, value: any) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return answers.interests.length > 0;
      case 1:
        return answers.skills.length > 0;
      case 2:
        return answers.workEnvironment !== '';
      case 3:
        return answers.learningStyle !== '';
      case 4:
        return answers.personalityTraits.length > 0;
      case 5:
        return answers.interestActivities.length > 0;
      case 6:
        return answers.workValues.length > 0;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
      onComplete(answers);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (isCompleted) {
    return (
      <Card className="max-w-2xl mx-auto animate-scale-in">
        <CardContent className="pt-12 pb-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-primary/10 animate-scale-in">
              <CheckCircle className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-3 animate-fade-in-up animation-delay-100">Survey Complete!</h3>
          <p className="text-muted-foreground mb-6 animate-fade-in-up animation-delay-200">
            Thank you for completing the survey. Scroll down to chat with our Career Assistant or view your
            personalized recommendations.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <SurveyProgress currentStep={currentStep + 1} totalSteps={totalSteps} />
        <CardTitle className="text-center mt-4">
          {currentStep === 0 && 'Areas of Interest'}
          {currentStep === 1 && 'Key Skills'}
          {currentStep === 2 && 'Work Environment'}
          {currentStep === 3 && 'Learning Style'}
          {currentStep === 4 && 'Personality Traits'}
          {currentStep === 5 && 'Preferred Activities'}
          {currentStep === 6 && 'Work Values'}
        </CardTitle>
      </CardHeader>
      <CardContent className="min-h-[300px]">
        <div key={currentStep} className="animate-fade-in">
          {currentStep === 0 && (
            <InterestsStep value={answers.interests} onChange={(val) => updateAnswers('interests', val)} />
          )}
          {currentStep === 1 && <SkillsStep value={answers.skills} onChange={(val) => updateAnswers('skills', val)} />}
          {currentStep === 2 && (
            <WorkEnvironmentStep
              value={answers.workEnvironment}
              onChange={(val) => updateAnswers('workEnvironment', val)}
            />
          )}
          {currentStep === 3 && (
            <LearningStyleStep value={answers.learningStyle} onChange={(val) => updateAnswers('learningStyle', val)} />
          )}
          {currentStep === 4 && (
            <PersonalityStep
              value={answers.personalityTraits}
              onChange={(val) => updateAnswers('personalityTraits', val)}
            />
          )}
          {currentStep === 5 && (
            <InterestActivitiesStep
              value={answers.interestActivities}
              onChange={(val) => updateAnswers('interestActivities', val)}
            />
          )}
          {currentStep === 6 && (
            <WorkValuesStep value={answers.workValues} onChange={(val) => updateAnswers('workValues', val)} />
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handleBack} 
          disabled={currentStep === 0}
          className="transition-all duration-200 hover:scale-[1.02]"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={!canProceed()}
          className="transition-all duration-200 hover:scale-[1.02]"
        >
          {currentStep === totalSteps - 1 ? 'Complete' : 'Next'}
          {currentStep < totalSteps - 1 && <ChevronRight className="h-4 w-4 ml-1" />}
        </Button>
      </CardFooter>
    </Card>
  );
}
