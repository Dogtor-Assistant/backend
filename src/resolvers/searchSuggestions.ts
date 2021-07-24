import type { SearchSuggestionsResolvers } from '@resolvers';

const SearchSuggestions: SearchSuggestionsResolvers = {
    cities({ cities }) {
        return cities;
    },
    minRating({ minRating }) {
        return minRating;
    },
    nearby({ nearby }) {
        return nearby;
    },
    specialities({ specialities }) {
        return specialities;
    },
};

export default SearchSuggestions;
