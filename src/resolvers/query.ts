
import type { QueryResolvers } from '@resolvers';
import type { IReview } from 'models/Review';

import Appointment from 'models/Appointment';
import Checkup from 'models/Checkup';
import Doctor from 'models/Doctor';
import Followup from 'models/Followup';
import Patient from 'models/Patient';
import ReviewModel from 'models/Review';
import Service from 'models/Service';
import User from 'models/User';
import {
    doctorsConnection,
    patientsConnection,
    reviewsConnection,
    servicesConnection,
    usersConnection,
} from 'pagination';
import { search } from 'search';
import { doctor } from 'shims/doctor';
import { patient } from 'shims/patient';
import { review } from 'shims/review';
import { Review } from 'shims/review';
import { service } from 'shims/service';
import { user } from 'shims/user';
import { deconstructId } from 'utils/ids';

const Query: QueryResolvers = {
    async doctors(_, args) {
        return await doctorsConnection(Doctor.find(), args);
    },
    greeting(_0, _1, { authenticated }) {
        if (authenticated != null) {
            return `Hello, User ${authenticated.id()}`;
        }

        return 'Hello World';
    },
    async latestReviews() {
        const reviews = await ReviewModel.aggregate().limit(5).exec();
        return reviews.map((review: IReview) => new Review(review));
    },
    async me(_, __, { authenticated }) {
        return authenticated;
    },
    async node(_, { id: nodeId }) {
        const deconstructed = deconstructId(nodeId);
        if (deconstructed == null) {
            return null;
        }

        const [nodeType, id] = deconstructed;

        switch (nodeType) {
        case 'Appointment':
            return await Appointment.findById(id);
        case 'Checkup':
            return await Checkup.findById(id);
        case 'Doctor':
            return await doctor(id);
        case 'Followup':
            return await Followup.findById(id);
        case 'Patient':
            return await patient(id);
        case 'Review':
            return await review(id);
        case 'Service':
            return await service(id);
        case 'User':
            return await user(id);
        }
    },
    async patients(_, args) {
        return await patientsConnection(Patient.find(), args);
    },
    async reviews(_, args) {
        return await reviewsConnection(ReviewModel.find(), args);
    },
    async search(_, { input, ...connectionArgs }) {
        const [doctors, scope] = search({
            cities: input.cities != null ? [...input.cities] : undefined,
            query: input.query ?? undefined,
            specialities: input.specialities != null ? [...input.specialities] : undefined,
        });
        const results = await doctorsConnection(doctors, connectionArgs);
        return {
            results,
            scope: {
                cities: scope?.cities ?? null,
                query: scope?.query ?? null,
                specialities: scope.specialities ?? null,
            },
        };
    },
    async services(_, args) {
        return await servicesConnection(Service.find(), args);
    },
    async users(_, args) {
        return await usersConnection(User.find(), args);
    },
};

export default Query;
