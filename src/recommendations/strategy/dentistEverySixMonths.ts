import type { RecommendationStrategy } from 'recommendations/types';

const strategy: RecommendationStrategy = {
    'kind': 'periodic',
    'periodInDays': 182,
    'service': 'dentist.checkup',
};

export default strategy;
