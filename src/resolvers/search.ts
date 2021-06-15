import type { SearchResolvers } from '@resolvers';

const Search: SearchResolvers = {
    results({ results }) {
        return results;
    },
    scope({ scope }) {
        return scope;
    },
    suggestions({ suggestions }) {
        return suggestions;
    },
};

export default Search;
