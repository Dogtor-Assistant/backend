import type { RecommendationStrategy } from 'recommendations/types';

import { deny, showIfAgeAbove } from 'recommendations/rules';

const strategy: RecommendationStrategy = {
    recommendation: {
        kind: 'periodic',
        periodInDays: 365,
        service: 'Skin Cancer Screening',
    },
    rule: [
        showIfAgeAbove(35),
        deny(),
    ],
};

export default strategy;
