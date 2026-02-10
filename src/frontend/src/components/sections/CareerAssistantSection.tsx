import { forwardRef } from 'react';
import { Section } from '../layout/Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, SkipForward } from 'lucide-react';
import { ChatThread } from '../chat/ChatThread';
import { ChatComposer } from '../chat/ChatComposer';
import { useCareerFlow } from '../../state/careerFlowStore';
import { useStartCareerChat, useSendCareerMessage, useCareerMessages } from '../../hooks/useQueries';

export const CareerAssistantSection = forwardRef<HTMLElement>((props, ref) => {
  const { surveyCompleted, conversationId, chatStarted, setChatStarted, chatSkipped, setChatSkipped } = useCareerFlow();

  const startChatMutation = useStartCareerChat(conversationId);
  const sendMessageMutation = useSendCareerMessage(conversationId);
  const { data: messages = [] } = useCareerMessages(conversationId, chatStarted);

  const handleStartChat = async () => {
    try {
      await startChatMutation.mutateAsync();
      setChatStarted(true);
    } catch (error) {
      console.error('Failed to start chat:', error);
    }
  };

  const handleSendMessage = async (message: string) => {
    try {
      await sendMessageMutation.mutateAsync(message);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleSkip = () => {
    setChatSkipped(true);
  };

  if (!surveyCompleted) {
    return (
      <Section
        ref={ref}
        id="assistant"
        title="Career Assistant"
        subtitle="Complete the survey to unlock personalized guidance"
        decoration="corners"
      >
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-muted">
                <MessageCircle className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
            <p className="text-muted-foreground">Complete the survey above to start chatting with our Career Assistant.</p>
          </CardContent>
        </Card>
      </Section>
    );
  }

  if (chatSkipped) {
    return (
      <Section
        ref={ref}
        id="assistant"
        title="Career Assistant"
        subtitle="You've chosen to skip the chat"
        decoration="corners"
      >
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-12 pb-12 text-center">
            <p className="text-muted-foreground mb-4">
              You can view your career recommendations below, or start a chat anytime.
            </p>
            <Button 
              onClick={() => setChatSkipped(false)}
              className="transition-all duration-200 hover:scale-[1.02] hover:shadow-soft-lg"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Start Chat Now
            </Button>
          </CardContent>
        </Card>
      </Section>
    );
  }

  if (!chatStarted) {
    return (
      <Section
        ref={ref}
        id="assistant"
        title="Career Assistant"
        subtitle="Get personalized guidance for your career journey"
        decoration="corners"
      >
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Ready to explore your options?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">
              Chat with our AI assistant to dive deeper into career paths that match your profile, or skip ahead to view
              your recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={handleStartChat} 
                disabled={startChatMutation.isPending}
                className="transition-all duration-200 hover:scale-[1.02] hover:shadow-soft-lg"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                {startChatMutation.isPending ? 'Starting...' : 'Start Chat'}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleSkip}
                className="transition-all duration-200 hover:scale-[1.02]"
              >
                <SkipForward className="h-4 w-4 mr-2" />
                Skip to Recommendations
              </Button>
            </div>
          </CardContent>
        </Card>
      </Section>
    );
  }

  return (
    <Section
      ref={ref}
      id="assistant"
      title="Career Assistant"
      subtitle="Ask questions and get personalized career guidance"
      decoration="corners"
    >
      <Card className="max-w-3xl mx-auto">
        <CardContent className="p-0">
          <ChatThread messages={messages} />
          <div className="p-4 border-t">
            <ChatComposer
              onSend={handleSendMessage}
              isLoading={sendMessageMutation.isPending}
              disabled={sendMessageMutation.isPending}
            />
          </div>
        </CardContent>
      </Card>
    </Section>
  );
});

CareerAssistantSection.displayName = 'CareerAssistantSection';
