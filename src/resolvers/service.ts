import type { ServiceResolvers } from '@resolvers';

const Service: ServiceResolvers = {
    id(service) {
        return service.id();
    },
};

export default Service;
