
import type { SmartScopeModifier } from 'search/types';

import cities from './cities';
import removeUnnecessaryWords from './removeUnnecessaryWords';
import specialties from './specialities';

const modifier: SmartScopeModifier = [
    cities,
    specialties,
    removeUnnecessaryWords,
];

export default modifier;
