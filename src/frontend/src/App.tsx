import { useRef } from 'react';
import { HomeSection } from './components/sections/HomeSection';
import { SurveySection } from './components/sections/SurveySection';
import { CareerAssistantSection } from './components/sections/CareerAssistantSection';
import { RecommendationsSection } from './components/sections/RecommendationsSection';
import { TechnologyExplanationSection } from './components/sections/TechnologyExplanationSection';
import { FooterSection } from './components/sections/FooterSection';
import { TopNav } from './components/layout/TopNav';
import { CareerFlowProvider } from './state/careerFlowStore';

function App() {
  const surveyRef = useRef<HTMLElement>(null);
  const chatRef = useRef<HTMLElement>(null);
  const recommendationsRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <CareerFlowProvider>
      <div className="min-h-screen bg-background">
        <TopNav
          onNavigate={(section) => {
            switch (section) {
              case 'home':
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
              case 'survey':
                scrollToSection(surveyRef);
                break;
              case 'chat':
                scrollToSection(chatRef);
                break;
              case 'recommendations':
                scrollToSection(recommendationsRef);
                break;
              case 'about':
                scrollToSection(aboutRef);
                break;
            }
          }}
        />
        <main>
          <HomeSection onStartSurvey={() => scrollToSection(surveyRef)} />
          <SurveySection ref={surveyRef} />
          <CareerAssistantSection ref={chatRef} />
          <RecommendationsSection ref={recommendationsRef} />
          <TechnologyExplanationSection ref={aboutRef} />
        </main>
        <FooterSection />
      </div>
    </CareerFlowProvider>
  );
}

export default App;
