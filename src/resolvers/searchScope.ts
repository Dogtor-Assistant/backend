import type { SearchScopeResolvers } from '@resolvers';

const SearchScope: SearchScopeResolvers = {
    cities({ cities }) {
        return cities;
    },
    minRating({ minRating }) {
        return minRating;
    },
    nearby({ nearby }) {
        return nearby;
    },
    query({ query }) {
        return query;
    },
    specialities({ specialities }) {
        return specialities;
    },
};

export default SearchScope;
