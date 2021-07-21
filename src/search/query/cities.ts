import type { QueryGenerator } from 'search/types';

const generator: QueryGenerator = ({ cities }) => {
    if (cities == null) {
        return null;
    }
    
    return {
        'address.city': {
            $in: cities,
        },
    };
};

export default generator;
