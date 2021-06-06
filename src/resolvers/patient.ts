import type { PatientResolvers } from '@resolvers';

import User from 'models/User';
import { buildId } from 'utils/ids';

const Patient: PatientResolvers = {
    activityLevel({ activityLevel }) {
        return activityLevel ?? null;
    },
    allergies({ allergies }) {
        return allergies ?? [];
    },
    async firstname({ _id: id }) {
        const user = await User.findOne({ patientRef: id });
        if (user == null) {
            throw 'Failed to find user for doctor';
        }
        return user.firstName;
    },
    gender({ gender }) {
        return gender ?? null;
    },
    height({ height }) {
        return height;
    },
    id({ _id: id }) {
        if (id == null) {
            throw 'Uninitialized Value!';
        }

        return buildId('Patient', id);
    },
    isSmoker({ smoker }) {
        return smoker ?? null;
    },
    async lastname({ _id: id }) {
        const user = await User.findOne({ patientRef: id });
        if (user == null) {
            throw 'Failed to find user for doctor';
        }
        return user.lastName;
    },
    medicalConditions({ medicalConditions }) {
        return medicalConditions ?? [];
    },
    medications({ medications }) {
        return medications ?? [];
    },
    surgeries({ surgeries }) {
        return surgeries ?? [];
    },
    weight({ weight }) {
        return weight;
    },
};

export default Patient;
