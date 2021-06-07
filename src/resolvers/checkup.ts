import type { CheckupResolvers } from '@resolvers';

import { Service } from 'shims/service';
import { buildId } from 'utils/ids';

const Checkup: CheckupResolvers = {
    id({ _id: id }) {
        if (id == null) {
            throw 'Uninitialized Value!';
        }

        return buildId('Checkup', id);
    },
    isRead({ isRead }) {
        return isRead;
    },
    services({ services }) {
        return services?.map(service => new Service(service)) ?? [];
    },
    suggestedDate({ suggestedDate }) {
        return suggestedDate;
    },
};

export default Checkup;
