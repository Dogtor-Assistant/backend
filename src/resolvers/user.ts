import type { UserResolvers } from '@resolvers';

import Doctor from 'models/Doctor';
import Patient from 'models/Patient';
import { buildId } from 'utils/ids';

const User: UserResolvers = {
    async doctorProfile({ doctorRef }) {
        if (doctorRef == null) {
            return null;
        }
        return await Doctor.findById(doctorRef);
    },
    firstname({ firstName }) {
        return firstName;
    },
    id({ _id: id }) {
        if (id == null) {
            throw 'Uninitialized Value!';
        }
        return buildId('User', id);
    },
    lastname({ lastName }) {
        return lastName;
    },
    async patientProfile({ patientRef }) {
        if (patientRef == null) {
            return null;
        }
        return await Patient.findById(patientRef);
    },
};

export default User;
