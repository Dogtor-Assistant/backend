import type { QueryGenerator } from 'search/types';

const generator: QueryGenerator = ({ query }) => {
    if (query == null) {
        return null;
    }
    
    return {
        $text: {
            $caseSensitive: false,
            $diacriticSensitive: false,
            $search: query,
        },
    };
};

export default generator;
