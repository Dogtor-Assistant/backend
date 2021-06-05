import type { RecommendationStrategy } from 'recommendations/types';

import dentistEverySixMonths from './dentistEverySixMonths';
import yearlySkinCancerScreening from './yearlySkinCancerScreening';

const strategy: RecommendationStrategy = [
    dentistEverySixMonths,
    yearlySkinCancerScreening,
];

export default strategy;
