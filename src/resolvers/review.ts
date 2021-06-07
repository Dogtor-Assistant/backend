import type { ReviewResolvers } from '@resolvers';

import { Doctor } from 'shims/doctor';
import { Patient } from 'shims/patient';

const Review: ReviewResolvers = {
    async content(review) {
        const { content } = await review.full();
        return content ?? null;
    },
    async doctor(review) {
        const { doctorRef } = await review.full();
        if (doctorRef == null) {
            throw 'Uninitialized Doctor';
        }
        return new Doctor(doctorRef);
    },
    id(review) {
        return review.id();
    },
    async patient(review) {
        const { patientRef } = await review.full();
        return new Patient(patientRef);
    },
    async rating(review) {
        const { rating } = await review.full();
        return rating;
    },
};

export default Review;
