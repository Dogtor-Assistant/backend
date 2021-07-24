import type { PatientResolvers } from '@resolvers';

import Checkup from 'models/Checkup';
import Followup from 'models/Followup';
import { deconstructId } from 'utils/ids';

const Patient: PatientResolvers = {
    async activityLevel(patient) {
        const { activityLevel } = await patient.full();
        return activityLevel ?? null;
    },
    async address(patient) {
        const { address } = await patient.full();
        return address ?? null;
    },
    async allergies(patient) {
        const { allergies } = await patient.full();
        return allergies ?? [];
    },
    async birthDate(patient) {
        const { birthDate } = await patient.full();
        return birthDate ?? null;
    },
    async firstname(patient) {
        const { firstName } = await patient.user();
        return firstName ?? null;
    },
    async gender(patient) {
        const { gender } = await patient.full();
        return gender ?? null;
    },
    async height(patient) {
        const { height } = await patient.full();
        return height ?? null;
    },
    id(patient) {
        return patient.id();
    },
    async insurance(patient) {
        const { insurance } = await patient.full();
        return insurance ?? null;
    },
    async isSmoker(patient) {
        const { smoker } = await patient.full();
        return smoker ?? null;
    },
    async lastname(patient) {
        const { lastName } = await patient.user();
        return lastName ?? null;
    },
    async medicalConditions(patient) {
        const { medicalConditions } = await patient.full();
        return medicalConditions ?? [];
    },
    async medications(patient) {
        const { medications } = await patient.full();
        return medications ?? [];
    },
    async surgeries(patient) {
        const { surgeries } = await patient.full();
        return surgeries ?? [];
    },
    async unreadCheckups(patient) {
        const id = await patient.id();
        
        const deconstructed = deconstructId(id);
        if (deconstructed == null) {
            return [];
        }

        const [nodeType, patientId] = deconstructed;
        if (nodeType !== 'Patient') {
            return [];
        }

        const unreadCheckups = await Checkup.find({ isRead: false, 'patientRef.patientId': patientId });
        return unreadCheckups;
    },
    async unreadFollowups(patient) {
        const id = await patient.id();
        
        const deconstructed = deconstructId(id);
        if (deconstructed == null) {
            return [];
        }

        const [nodeType, patientId] = deconstructed;
        if (nodeType !== 'Patient') {
            return [];
        }

        const unreadFollowups = await Followup.find({ isRead: false, 'patientRef.patientId': patientId });
        return unreadFollowups;
    },
    async weight(patient) {
        const { weight } = await patient.full();
        return weight ?? null;
    },
};

export default Patient;
