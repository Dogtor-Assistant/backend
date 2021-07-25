import type { FollowupResolvers } from '@resolvers';

import { Doctor } from 'shims/doctor';
import { buildId } from 'utils/ids';

const Followup: FollowupResolvers = {
    doctor({ doctorRef }) {
        return new Doctor(doctorRef);
    },
    id({ _id: id }) {
        if (id == null) {
            throw 'Uninitialized Value!';
        }

        return buildId('Followup', id);
    },
    isRead({ isRead }) {
        return isRead;
    },
    services({ services }) {
        return services.map(service => {
            const id = service.serviceId === undefined ? '' : service.serviceId;
            const name = service.serviceName === undefined ? '' : service.serviceName;
            return { 'serviceId': id, 'serviceName': name };
        }) ?? [];
    },
    suggestedDate({ suggestedDate }) {
        return suggestedDate;
    },
};

export default Followup;
