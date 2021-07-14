import type { QueryGenerator } from 'search/types';

import cities from './cities';
import specialities from './specialities';
import text from './text';

const generator: QueryGenerator = [
    cities,
    specialities,
    text,
];

export default generator;
