import type { SmartFilter } from 'search/types';

const filter: SmartFilter = {
    filterFromInput({ specialities }) {
        if (specialities == null) {
            return null;
        }
        return {
            specialities: {
                $in: specialities,
            },
        };
    },
    filterFromWords(specialities) {
        return [
            {
                specialities: {
                    $in: specialities,
                },
            },
            {
                specialities: specialities,
            },
        ];
    },
    languageTag: 'Specialty',
};

export default filter;
