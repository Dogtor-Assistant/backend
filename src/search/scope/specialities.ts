import type { SmartScopeModifier } from 'search/types';

import nlp from './helpers/nlp';

const modifier: SmartScopeModifier = scope => {
    if (scope.specialities != null || scope.query == null) {
        return scope;
    }

    const { query: previusQuery, ...rest } = scope;
    const result = nlp(previusQuery, 'Specialty');
    if (result == null) {
        return scope;
    }

    const [query, specialities] = result;
    
    return {
        ...rest,
        query,
        specialities,
    };
};

export default modifier;
