import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SurveyResult {
    socialProblemSolving: SurveyScore;
    careerSatisfaction: SurveyScore;
    itSkills: SurveyScore;
    requirementsClarity: SurveyScore;
    mathInterest: number;
    mathSkills: SurveyScore;
    selfReflection: SurveyScore;
}
export type SurveyScore = number;
export interface ChatMessage {
    isUser: boolean;
    message: string;
}
export interface CareerMatchExplanation {
    description: string;
    matchReasons: string;
    typicalEducation: string;
    requiredSkills: Array<string>;
    careerTitle: string;
}
export enum SurveyType {
    socialProblemSolving = "socialProblemSolving",
    careerSurveyTotalScore = "careerSurveyTotalScore",
    careerSatisfaction = "careerSatisfaction",
    careerRecommendationScore = "careerRecommendationScore",
    itSkills = "itSkills",
    requirementsClarity = "requirementsClarity",
    mathInterest = "mathInterest",
    mathSkills = "mathSkills",
    personalInterest = "personalInterest",
    selfReflection = "selfReflection"
}
export interface backendInterface {
    checkRequirements(requirementsClarity: bigint | null, _language: string | null): Promise<CareerMatchExplanation | null>;
    clearCareerContent(): Promise<void>;
    getCareerMessages(conversationId: string): Promise<Array<ChatMessage>>;
    getCareerRecommendations(surveyResults: SurveyResult): Promise<Array<CareerMatchExplanation> | null>;
    getCompletionStatus(arg0: {
        conversationId: string;
        surveyType: SurveyType;
    }): Promise<boolean>;
    getTotalQuestionCount(): Promise<bigint>;
    handleCareerRequest(conversationId: string, userInput: string): Promise<string>;
    startCareerChat(conversationId: string): Promise<string>;
}
