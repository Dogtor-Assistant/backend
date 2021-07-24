import type { RecommendationResolvers } from '@resolvers';

const Recommendation: RecommendationResolvers = {
    kind({ kind }) {
        return kind;
    },
    periodInDays({ periodInDays }) {
        return periodInDays;
    },
    service({ service }) {
        return service;
    },
};

export default Recommendation;
