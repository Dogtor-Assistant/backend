import type { SearchSuggestionsResolvers } from '@resolvers';

const SearchSuggestions: SearchSuggestionsResolvers = {
    specialities({ specialities }) {
        return specialities;
    },
};

export default SearchSuggestions;
