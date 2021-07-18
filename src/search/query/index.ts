import type { QueryGenerator } from 'search/types';

import cities from './cities';
import nearby from './nearby';
import specialities from './specialities';
import text from './text';

const generator: QueryGenerator = [
    nearby,
    cities,
    specialities,
    text,
];

export default generator;
