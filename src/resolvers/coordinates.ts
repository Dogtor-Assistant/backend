import type { CoordinatesResolvers } from '@resolvers';

const Coordinates: CoordinatesResolvers = {
    latitude({ latitude }) {
        return latitude;
    },
    longitude({ longitude }) {
        return longitude;
    },
};

export default Coordinates;
