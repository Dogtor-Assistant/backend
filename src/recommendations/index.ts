
import type {
    InferenceRule,
    InferenceRuleResult,
    Recommendation,
    RecommendationStrategy,
    UserMedicalData,
} from './types';

import defaultStrategy from './strategy';

function evaluateRule(rule: InferenceRule, data: UserMedicalData): InferenceRuleResult {
    if (typeof rule === 'string') {
        return rule;
    }

    if (typeof rule === 'function') {
        return rule(data);
    }

    if (typeof rule === 'object') {
        for (const innerRule of rule) {
            const result = evaluateRule(innerRule, data);
            if (result !== 'Skip') {
                return result;
            }
        }
    }

    return 'Deny';
}

function evaluateStrategy(strategy: RecommendationStrategy, data: UserMedicalData): Recommendation[] {
    if ('length' in strategy) {
        return strategy.flatMap(inner => evaluateStrategy(inner, data));
    }

    if ('kind' in strategy) {
        return [strategy];
    }

    if (evaluateRule(strategy.rule, data) === 'Show') {
        return [strategy.recommendation];
    }

    return [];
}

class RecommendationService {
    _strategy: RecommendationStrategy
    
    constructor(strategy: RecommendationStrategy = defaultStrategy) {
        this._strategy = strategy;
    }

    recommendations(data: UserMedicalData): Recommendation[] {
        const recommendations = evaluateStrategy(this._strategy, data);
        const groupped = recommendations.reduce<Record<string, Recommendation[] | undefined>>(
            (acc, recommendation) => {
                const previous = acc[recommendation.service] ?? [];
                return {
                    ...acc,
                    [recommendation.service]: [...previous, recommendation],
                };
            },
            {},
        );

        return Object.keys(groupped).map(key => {
            const recs = groupped[key] ?? [];
            return recs.reduce((lhs, rhs) => {
                if (lhs.kind === 'single') {
                    return rhs;
                }

                if (rhs.kind === 'single') {
                    return lhs;
                }

                if (lhs.periodInDays > rhs.periodInDays) {
                    return rhs;
                }

                return lhs;
            });
        });
    }
}

export default RecommendationService;
