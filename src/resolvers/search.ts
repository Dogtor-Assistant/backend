import type { SearchResolvers } from '@resolvers';

const Search: SearchResolvers = {
    results({ results }) {
        return results;
    },
    scope({ scope }) {
        return scope;
    },
};

export default Search;
