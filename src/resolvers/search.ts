import type { SearchResolvers } from '@resolvers';

import { doctorsConnection } from 'pagination';
import { buildId } from 'utils/ids';

const Search: SearchResolvers = {
    id({ input }) {
        const inputAsRecord = input as Record<string, unknown>;
        const orderedInput = Object.keys(inputAsRecord).sort().reduce(
            (obj, key) => {
                return {
                    ...obj,
                    [key]: inputAsRecord[key],
                };
            },
            {},
        );

        const stringified = JSON.stringify(orderedInput);
        const encoded = Buffer.from(stringified, 'ascii').toString('base64');
        return buildId('Search', encoded);
    },
    results({ query }, connectionArgs) {
        return doctorsConnection(query, connectionArgs);
    },
    scope({ scope }) {
        return {
            cities: scope?.cities ?? null,
            query: scope?.query ?? null,
            specialities: scope.specialities ?? null,
        };
    },
    suggestions({ suggestions }) {
        return {
            cities: suggestions.cities ?? null,
            specialities: suggestions.specialities ?? null,
        };
    },
};

export default Search;
