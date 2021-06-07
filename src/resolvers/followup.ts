import type { FollowupResolvers } from '@resolvers';

import { Doctor } from 'shims/doctor';
import { Service } from 'shims/service';
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
        return services.map(service => new Service(service)) ?? [];
    },
    suggestedDate({ suggestedDate }) {
        return suggestedDate;
    },
};

export default Followup;
