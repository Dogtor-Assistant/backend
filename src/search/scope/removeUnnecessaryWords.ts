
import type { SmartScopeModifier } from 'search/types';

import nlp from 'nlp';

const modifier: SmartScopeModifier = scope => {
    if (scope.query == null) {
        return scope;
    }

    const { query: previusQuery, ...rest } = scope;
    const document = nlp(previusQuery);

    // skip words like `in` and `for`
    const unimportant = [
        document.adverbs().out('array'),
        document.prepositions().out('array'),
        document.conjunctions().out('array'),
    ].flatMap(words => words).map(word => word.toLowerCase());

    if (unimportant.length < 1) {
        return scope;
    }

    const tags = document.out('tags')[0];
    const allWords = tags != null ? Object.keys(tags).filter(word => !unimportant.includes(word.toLowerCase())) : [];

    const query = allWords.length > 0 ? allWords.join(' ') : undefined;
    return {
        query,
        ...rest,
    };
};

export default modifier;
