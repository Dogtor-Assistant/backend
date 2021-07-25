
export interface UserMedicalData {
    dateOfBirth: Date,
    insurance: 'Public' | 'Private',
    gender?: 'Male' | 'Female' | 'TransgenderMale' | 'TransgenderFemale' | 'NonBinary',
    medications: string[],
    conditions: string[],
}

interface BasicRecommendation {
    service: string,
}

type PeriodicRecommendation = BasicRecommendation & {
    kind: 'periodic',
    periodInDays: number,
}

type OneTimeRecommendation = BasicRecommendation & {
    kind: 'single',
}

export type Recommendation = PeriodicRecommendation | OneTimeRecommendation;

export type ConcreteRecommendation = BasicRecommendation & {
    suggestedDate: Date,
}

export type InferenceRuleResult = 'Skip' | 'Show' | 'Deny'
export type InferenceRule = ((data: UserMedicalData) => InferenceRuleResult) | InferenceRule[] | InferenceRuleResult

export type RecommendationStrategy = {
    recommendation: Recommendation,
    rule: InferenceRule,
} | RecommendationStrategy[] | Recommendation
