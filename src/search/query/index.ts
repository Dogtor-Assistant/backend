import type { QueryGenerator } from 'search/types';

import cities from './cities';
import minRating from './minRating';
import nearby from './nearby';
import specialities from './specialities';
import text from './text';

const generator: QueryGenerator = [
    nearby,
    cities,
    specialities,
    text,
    minRating,
];

export default generator;
