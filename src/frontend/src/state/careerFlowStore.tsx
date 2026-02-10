import { createContext, useContext, useState, type ReactNode } from 'react';

export interface SurveyAnswers {
  interests: string[];
  skills: string[];
  workEnvironment: string;
  learningStyle: string;
  personalityTraits: string[];
  interestActivities: string[];
  workValues: string[];
}

interface CareerFlowState {
  surveyAnswers: SurveyAnswers | null;
  setSurveyAnswers: (answers: SurveyAnswers) => void;
  surveyCompleted: boolean;
  setSurveyCompleted: (completed: boolean) => void;
  conversationId: string;
  chatStarted: boolean;
  setChatStarted: (started: boolean) => void;
  chatSkipped: boolean;
  setChatSkipped: (skipped: boolean) => void;
}

const CareerFlowContext = createContext<CareerFlowState | undefined>(undefined);

export function CareerFlowProvider({ children }: { children: ReactNode }) {
  const [surveyAnswers, setSurveyAnswers] = useState<SurveyAnswers | null>(null);
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [conversationId] = useState(() => `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [chatStarted, setChatStarted] = useState(false);
  const [chatSkipped, setChatSkipped] = useState(false);

  return (
    <CareerFlowContext.Provider
      value={{
        surveyAnswers,
        setSurveyAnswers,
        surveyCompleted,
        setSurveyCompleted,
        conversationId,
        chatStarted,
        setChatStarted,
        chatSkipped,
        setChatSkipped,
      }}
    >
      {children}
    </CareerFlowContext.Provider>
  );
}

export function useCareerFlow() {
  const context = useContext(CareerFlowContext);
  if (!context) {
    throw new Error('useCareerFlow must be used within CareerFlowProvider');
  }
  return context;
}
