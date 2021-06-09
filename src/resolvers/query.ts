
import type { QueryResolvers } from '@resolvers';
import type { IReview } from 'models/Review';

import Appointment from 'models/Appointment';
import Checkup from 'models/Checkup';
import Followup from 'models/Followup';
import ReviewModel from 'models/Review';
import { doctor } from 'shims/doctor';
import { patient } from 'shims/patient';
import { review } from 'shims/review';
import { Review } from 'shims/review';
import { service } from 'shims/service';
import { user } from 'shims/user';
import { deconstructId } from 'utils/ids';

const Query: QueryResolvers = {
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
};

export default Query;
