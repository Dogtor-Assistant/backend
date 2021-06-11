
import type { SmartFilter } from 'search/types';

const filter: SmartFilter = {
    filterFromInput({ cities }) {
        if (cities == null) {
            return null;
        }
        return {
            'address.city': {
                $in: cities,
            },
        };
    },
    filterFromWords(cities) {
        return [
            {
                'address.city': {
                    $in: cities,
                },
            },
            {
                cities: cities,
            },
        ];
    },
    languageTag: 'City',
};

export default filter;
