import type { AddressResolvers } from '@resolvers';

const Address: AddressResolvers = {
    city({ city }) {
        return city;
    },
    coordinates({ location }) {
        const [longitude, latitude] = location.coordinates;
        return {
            latitude,
            longitude,
        };
    },
    streetName({ streetName }) {
        return streetName;
    },
    streetNumber({ streetNumber }) {
        return streetNumber;
    },
    zipCode({ zipCode }) {
        return zipCode;
    },
};

export default Address;
