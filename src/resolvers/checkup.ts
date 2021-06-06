import type { CheckupResolvers } from '@resolvers';

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
    services() {
        throw 'Not Implemented';
    },
    suggestedDate({ suggestedDate }) {
        return suggestedDate;
    },
};

export default Checkup;
