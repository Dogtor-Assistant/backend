
import type { SmartScopeModifier } from 'search/types';

import nlp from './helpers/nlp';

const modifier: SmartScopeModifier = scope => {
    if (scope.cities != null || scope.query == null) {
        return scope;
    }

    const { query: previusQuery, ...rest } = scope;
    const result = nlp(previusQuery, 'City');
    if (result == null) {
        return scope;
    }

    const [query, cities] = result;
    
    return {
        ...rest,
        cities,
        query,
    };
};

export default modifier;
