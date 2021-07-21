
import type { SmartScopeModifier } from 'search/types';

import cities from './cities';
import removeQueryIfNearbyIsApplied from './removeQueryIfNearbyIsApplied';
import removeUnnecessaryWords from './removeUnnecessaryWords';
import specialties from './specialities';

const modifier: SmartScopeModifier = [
    cities,
    specialties,
    removeUnnecessaryWords,
    removeQueryIfNearbyIsApplied,
];

export default modifier;
