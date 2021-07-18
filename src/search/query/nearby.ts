import type { QueryGenerator } from 'search/types';

const generator: QueryGenerator = ({ nearby }) => {
    if (nearby == null) {
        return null;
    }
    
    return {
        'address.location': {
            $near: {
                $geometry: {
                    coordinates: [nearby.coordinates.longitude, nearby.coordinates.longitude],
                    type: 'Point',
                },
                $maxDistance: nearby.maximumDistanceInMeters,
            },
        },
    };
};

export default generator;
