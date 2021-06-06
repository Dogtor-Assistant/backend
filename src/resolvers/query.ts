
import type { QueryResolvers } from '@resolvers';

import Appointment from 'models/Appointment';
import Checkup from 'models/Checkup';
import Doctor from 'models/Doctor';
import Followup from 'models/Followup';
import Patient from 'models/Patient';
import Review from 'models/Review';
import Service from 'models/Service';
import User from 'models/User';
import { deconstructId } from 'utils/ids';

const Query: QueryResolvers = {
    greeting(_0, _1, { authenticated }) {
        if (authenticated != null) {
            return `Hello, User ${authenticated.id}`;
        }

        return 'Hello World';
    },
    async me(_0, _1, { authenticated }) {
        if (authenticated == null) {
            return null;
        }

        return await User.findOne({ _id : authenticated.id });
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
            return await Doctor.findById(id);
        case 'Followup':
            return await Followup.findById(id);
        case 'Patient':
            return await Patient.findById(id);
        case 'Review':
            return await Review.findById(id);
        case 'Service':
            return await Service.findById(id);
        case 'User':
            return await User.findById(id);
        }
    },
};

export default Query;
