import type { SearchScopeResolvers } from '@resolvers';

const SearchScope: SearchScopeResolvers = {
    cities({ cities }) {
        return cities;
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
