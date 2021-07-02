import type { ServiceResolvers } from '@resolvers';

import { Doctor } from 'shims/doctor';

const Service: ServiceResolvers = {
    async description(service) {
        const { description } = await service.full();
        return description;
    },

    async doctor(service) {
        const { doctorRef } = await service.full();
        if (doctorRef == null) {
            throw 'Uninitialized Doctor';
        }
        return new Doctor(doctorRef);
    },

    async estimatedDuration(service) {
        const { estimatedDuration } = await service.full();
        return estimatedDuration;
    },

    id(service) {
        return service.id();
    },

    async name(service) {
        const { name } = await service.full();
        return name;
    },

    async privateCovered(service) {
        const { privateCovered } = await service.full();
        return privateCovered;
    },

    async publicCovered(service) {
        const { publicCovered } = await service.full();
        return publicCovered;
    },
    
    async timesSelected(service) {
        const { timesSelected } = await service.full();
        if (timesSelected == null) {
            throw 'Error timesSelected';
        }
        return timesSelected;
    },
};

export default Service;
