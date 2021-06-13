import type { SearchSuggestionsResolvers } from '@resolvers';

const SearchSuggestions: SearchSuggestionsResolvers = {
    cities({ cities }) {
        return cities;
    },
    specialities({ specialities }) {
        return specialities;
    },
};

export default SearchSuggestions;
