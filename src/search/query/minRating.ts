import type { QueryGenerator } from 'search/types';

const generator: QueryGenerator = ({ minRating }) => {
    if (minRating == null) {
        return null;
    }
    
    return {
        starRating: {
            $gte: minRating,
        },
    };
};

export default generator;
