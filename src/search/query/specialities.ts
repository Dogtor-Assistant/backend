import type { QueryGenerator } from 'search/types';

const generator: QueryGenerator = ({ specialities }) => {
    if (specialities == null) {
        return null;
    }
    
    return {
        specialities: {
            $in: specialities,
        },
    };
};

export default generator;
