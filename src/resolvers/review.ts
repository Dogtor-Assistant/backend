import type { ReviewResolvers } from '@resolvers';

import Doctor from 'models/Doctor';
import Patient from 'models/Patient';
import { buildId } from 'utils/ids';

const Review: ReviewResolvers = {
    content({ content }) {
        return content ?? null;
    },
    async doctor({ doctorRef }) {
        const doctor = await Doctor.findById(doctorRef);
        if (doctor == null) {
            throw 'Doctor not found';
        }
        return doctor;
    },
    id({ _id: id }) {
        if (id == null) {
            throw 'Uninitialized Value!';
        }
        return buildId('Review', id);
    },
    async patient({ patientRef }) {
        const patient = await Patient.findById(patientRef);
        if (patient == null) {
            throw 'Patient not found!';
        }
        return patient;
    },
    rating({ rating }) {
        return rating;
    },
};

export default Review;
