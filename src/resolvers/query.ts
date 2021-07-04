
import type { QueryResolvers, QuerySearchArgs } from '@resolvers';
import type { IAppointment } from 'models/Appointment';
import type { IReview } from 'models/Review';

import Appointment from 'models/Appointment';
import Checkup from 'models/Checkup';
import Doctor from 'models/Doctor';
import Followup from 'models/Followup';
import Patient from 'models/Patient';
import ReviewModel from 'models/Review';
import Service from 'models/Service';
import User from 'models/User';
import mongoose from 'mongoose';
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
        const reviews = await ReviewModel.aggregate([
            {
                $match: {
                    //TODO: change the 'days' to last weeks reviews before last prototype!!!
                    createdAt: { $gte: new Date(new Date().getTime()-200*24*60*60*1000) },
                },
            },
            { $sort : { rating: -1 }},
        ]).limit(9).exec();
        return reviews.map((review: IReview) => new Review(review));
    },
    async me(_, __, { authenticated }) {
        return authenticated;
    },
    async node(_, { id: nodeId }, context) {
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
        case 'Search': {
            const json = Buffer.from(id, 'base64').toString('ascii');
            const input = JSON.parse(json) as QuerySearchArgs;
            return await search(input, context);
        }
        case 'Service':
            return await service(id);
        case 'User':
            return await user(id);
        }
    },
    async patientPreviousAppointments(_, { id: nodeId }) {
        const deconstructed = deconstructId(nodeId);
        if (deconstructed == null) {
            return [];
        }

        const [nodeType, id] = deconstructed;

        if (nodeType === 'Patient') {
            const appointments = await Appointment.find({
                expectedTime: { $lt: new Date() },
                'patientRef.patientId': mongoose.Types.ObjectId(id),
            });
            return appointments.map((appointment: IAppointment) => new Appointment(appointment));
        }
        return [];
    },
    async patientUpcomingAppointments(_, { id: nodeId }) {
        const deconstructed = deconstructId(nodeId);
        if (deconstructed == null) {
            return [];
        }

        const [nodeType, id] = deconstructed;

        if (nodeType === 'Patient') {
            const appointments = await Appointment.find({
                expectedTime: { $gte: new Date() },
                'patientRef.patientId': mongoose.Types.ObjectId(id),
            });
            return appointments.map((appointment: IAppointment) => new Appointment(appointment));
        }
        return [];
    },
    async patients(_, args) {
        return await patientsConnection(Patient.find(), args);
    },
    async reviews(_, args) {
        return await reviewsConnection(ReviewModel.find(), args);
    },
    async search(_, input, context) {
        return await search(input, context);
    },
    async services(_, args) {
        return await servicesConnection(Service.find(), args);
    },
    async users(_, args) {
        return await usersConnection(User.find(), args);
    },
};

export default Query;
