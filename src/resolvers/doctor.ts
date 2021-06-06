import type { DoctorResolvers } from '@resolvers';

import User from 'models/User';
import { buildId } from 'utils/ids';

const Doctor: DoctorResolvers = {
    address({ address }) {
        return address;
    },

    async firstname({ _id: id }) {
        const user = await User.findOne({ doctorRef: id });
        if (user == null) {
            throw 'Failed to find user for doctor';
        }
        return user.firstName;
    },

    id({ _id: id }) {
        if (id == null) {
            throw 'Uninitialized Value!';
        }

        return buildId('Doctor', id);
    },

    async lastname({ _id: id }) {
        const user = await User.findOne({ doctorRef: id });
        if (user == null) {
            throw 'Failed to find user for doctor';
        }
        return user.lastName;
    },

    offeredSlots() {
        throw 'Not Implemented';
    },

    rating({ starRating }) {
        return starRating ?? 0;
    },

    specialities({ specialities }) {
        return specialities;
    },

    topReviews() {
        throw 'Not Implemented';
    },

    topServices() {
        throw 'Not Implemented';
    },
    
    webpage({ webpage }) {
        return webpage;
    },
};

export default Doctor;
