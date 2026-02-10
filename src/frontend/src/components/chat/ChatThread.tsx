import { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, User } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import type { ChatMessage } from '../../backend';

interface ChatThreadProps {
  messages: ChatMessage[];
  isLoading?: boolean;
}

export function ChatThread({ messages, isLoading }: ChatThreadProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const prevMessageCountRef = useRef(messages.length);

  useEffect(() => {
    if (scrollRef.current && messages.length > prevMessageCountRef.current) {
      // Use requestAnimationFrame to ensure smooth scroll after layout
      requestAnimationFrame(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      });
    }
    prevMessageCountRef.current = messages.length;
  }, [messages.length]);

  return (
    <ScrollArea className="h-[400px] pr-4" ref={scrollRef}>
      <div className="space-y-4">
        {messages.map((msg, idx) => {
          const isNewMessage = idx === messages.length - 1 && messages.length > prevMessageCountRef.current;
          return (
            <div 
              key={idx} 
              className={`flex gap-3 ${msg.isUser ? 'flex-row-reverse' : 'flex-row'} ${isNewMessage ? 'animate-fade-in-up' : ''}`}
            >
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className={msg.isUser ? 'bg-primary text-primary-foreground' : 'bg-primary/80 text-primary-foreground'}>
                  {msg.isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </AvatarFallback>
              </Avatar>
              <div
                className={`rounded-lg px-4 py-3 max-w-[80%] transition-colors duration-200 ${
                  msg.isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
              </div>
            </div>
          );
        })}
        {isLoading && (
          <div className="flex gap-3 animate-fade-in">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className="bg-primary/80 text-primary-foreground">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="rounded-lg px-4 py-3 bg-muted space-y-2">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
