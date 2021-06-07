import type { UserResolvers } from '@resolvers';

import { Doctor } from 'shims/doctor';
import { Patient } from 'shims/patient';

const User: UserResolvers = {
    async doctorProfile(user) {
        const { doctorRef } = await user.full();
        return doctorRef != null ? new Doctor(doctorRef) : null;
    },
    async firstname(user) {
        const { firstName } = await user.full();
        return firstName;
    },
    id(user) {
        return user.id();
    },
    async lastname(user) {
        const { lastName } = await user.full();
        return lastName;
    },
    async patientProfile(user) {
        const { patientRef } = await user.full();
        return patientRef != null ? new Patient(patientRef) : null;
    },
};

export default User;
