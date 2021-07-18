import type { SearchSuggestionsResolvers } from '@resolvers';

const SearchSuggestions: SearchSuggestionsResolvers = {
    cities({ cities }) {
        return cities;
    },
    nearby({ nearby }) {
        return nearby;
    },
    specialities({ specialities }) {
        return specialities;
    },
};

export default SearchSuggestions;
