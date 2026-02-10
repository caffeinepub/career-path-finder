import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { CareerMatchExplanation, ChatMessage } from '../backend';

export function useCareerRecommendations(itSkills: number, mathSkills: number, enabled: boolean) {
  const { actor, isFetching } = useActor();

  return useQuery<CareerMatchExplanation[]>({
    queryKey: ['careerRecommendations', itSkills, mathSkills],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getCareerRecommendations({
        mathInterest: mathSkills,
        itSkills,
        mathSkills,
        socialProblemSolving: 2,
        selfReflection: 2,
        careerSatisfaction: 2,
        requirementsClarity: 2,
      });
      return result || [];
    },
    enabled: !!actor && !isFetching && enabled,
  });
}

export function useStartCareerChat(conversationId: string) {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.startCareerChat(conversationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['careerMessages', conversationId] });
    },
  });
}

export function useSendCareerMessage(conversationId: string) {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userInput: string) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.handleCareerRequest(conversationId, userInput);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['careerMessages', conversationId] });
    },
  });
}

export function useCareerMessages(conversationId: string, enabled: boolean) {
  const { actor, isFetching } = useActor();

  return useQuery<ChatMessage[]>({
    queryKey: ['careerMessages', conversationId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCareerMessages(conversationId);
    },
    enabled: !!actor && !isFetching && enabled,
    refetchInterval: 2000,
  });
}
