import type { ServiceResolvers } from '@resolvers';

import { buildId } from 'utils/ids';

const Service: ServiceResolvers = {
    id({ _id: id }) {
        if (id == null) {
            throw 'Uninitialized Value!';
        }

        return buildId('Service', id);
    },
};

export default Service;
