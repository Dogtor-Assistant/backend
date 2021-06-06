import type { AddressResolvers } from '@resolvers';

const Address: AddressResolvers = {
    city({ city }) {
        return city;
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
