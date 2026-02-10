import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

interface ChatComposerProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function ChatComposer({ onSend, isLoading, disabled }: ChatComposerProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message... (Press Enter to send)"
        className="min-h-[60px] resize-none transition-all duration-200 focus:shadow-soft"
        disabled={isLoading || disabled}
      />
      <Button 
        type="submit" 
        size="icon" 
        disabled={!message.trim() || isLoading || disabled} 
        className="shrink-0 h-[60px] w-[60px] transition-all duration-200 hover:scale-[1.02] disabled:hover:scale-100"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
