import type { NearbyLocationResolvers } from '@resolvers';

const NearbyLocation: NearbyLocationResolvers = {
    coordinates({ coordinates }) {
        return coordinates;
    },
    label({ label }) {
        return label;
    },
    maximumDistanceInMeters({ maximumDistanceInMeters }) {
        return maximumDistanceInMeters;
    },
};

export default NearbyLocation;
