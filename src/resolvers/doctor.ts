import type { DoctorResolvers } from '@resolvers';

import Appointment from 'models/Appointment';
import { Review } from 'shims/review';
import { Service } from 'shims/service';
import { deconstructId } from 'utils/ids';

const Doctor: DoctorResolvers = {
    async address(doctor) {
        const { address } = await doctor.full();
        return address;
    },

    async appointments(doctor) {
        const id = doctor.id();
        const deconstructed = deconstructId(id);
        const doctorId = deconstructed?.[1];

        const appointments = await Appointment.find(
            { 'doctorRef.doctorId': doctorId },
        );
        
        return appointments;
    },

    async firstname(doctor) {
        const { firstName } = await doctor.user();
        return firstName;
    },

    id(doctor) {
        return doctor.id();
    },

    async lastname(doctor) {
        const { lastName } = await doctor.user();
        return lastName;
    },

    async offeredSlots(doctor) {
        const { offeredSlots } = await doctor.full();
        return offeredSlots?.map(slot => {
            return {
                day: slot.day,
                end: slot.slotStop,
                start: slot.slotStart,
            };
        }) ?? [];
    },

    async rating(doctor) {
        const { starRating } = await doctor.full();
        return starRating ?? 0;
    },

    async specialities(doctor) {
        const { specialities } = await doctor.full();
        return specialities;
    },

    async topReviews(doctor) {
        const { topReviews } = await doctor.full();
        return topReviews?.map(review => new Review(review)) ?? [];
    },

    async topServices(doctor) {
        const { topServices } = await doctor.full();
        return topServices?.map(service => new Service(service)) ?? [];
    },
    async webpage(doctor) {
        const { webpage } = await doctor.full();
        return webpage ?? null;
    },
};

export default Doctor;
