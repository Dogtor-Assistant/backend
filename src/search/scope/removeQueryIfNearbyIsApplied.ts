
import type { SmartScopeModifier } from 'search/types';

// MongoDB doesn't allow us to use a text index query and a geospacial index query at the same time...
// Since text is probably less useful... geospacial should take priority
const modifier: SmartScopeModifier = scope => {
    if (scope.nearby == null) {
        return scope;
    }

    return {
        ...scope,
        query: undefined,
    };
};

export default modifier;
