import type { FollowupResolvers } from '@resolvers';

import Doctor from 'models/Doctor';
import { buildId } from 'utils/ids';

const Followup: FollowupResolvers = {
    async doctor({ doctorRef }) {
        const doctor = await Doctor.findById(doctorRef);
        if (doctor == null) {
            throw 'Failed to find doctor';
        }
        return doctor;
    },
    id({ _id: id }) {
        if (id == null) {
            throw 'Uninitialized Value!';
        }

        return buildId('Doctor', id);
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

export default Followup;
