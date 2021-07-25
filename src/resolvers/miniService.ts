import type { MiniServiceResolvers } from '@resolvers';

import { buildId } from 'utils/ids';

const MiniService: MiniServiceResolvers = {
    serviceId({ serviceId }) {
        if (serviceId == null) {
            throw 'Uninitialized Value!';
        }

        return buildId('Service', serviceId);
    },

    async serviceName({ serviceName }) {
        return serviceName;
    },
};

export default MiniService;
