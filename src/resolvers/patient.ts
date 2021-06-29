import type { PatientResolvers } from '@resolvers';

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
    async weight(patient) {
        const { weight } = await patient.full();
        return weight ?? null;
    },
};

export default Patient;
