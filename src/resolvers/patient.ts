import type { PatientResolvers } from '@resolvers';

import RecommendationService from 'recommendations';

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
    async checkupRecommendations(patient) {
        const recService = new RecommendationService();
        const { birthDate, insurance, gender, medications, medicalConditions } = await patient.full();
        if (birthDate && insurance && medications && medicalConditions) {
            const dateOfBirth = new Date(birthDate);
            
            const insuranceStr: 'Public' | 'Private' = insurance === 1 ? 'Private' : 'Public';

            const genderArr: ('Male' | 'Female' | 'TransgenderMale' | 'TransgenderFemale' | 'NonBinary' | undefined)[] =
            ['Female', 'Male', 'TransgenderFemale', 'TransgenderMale', 'NonBinary'];
            
            const genderStr = gender ? genderArr[gender] : undefined;
            const userData = {
                conditions: medicalConditions,
                dateOfBirth,
                gender: genderStr,
                insurance: insuranceStr,
                medications,
            };
            
            const recommendations = recService.recommendations(userData);

            const recArr = recommendations.map(rec => {
                return {
                    'kind': rec.kind.toString(),
                    'periodInDays': 'periodInDays' in rec ? rec.periodInDays : null,
                    'service': rec.service.toString(),
                };
            });
            return recArr;
        }

        return [];
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
    async weight(patient) {
        const { weight } = await patient.full();
        return weight ?? null;
    },
};

export default Patient;
