import type { AppointmentTimeResolvers } from '@resolvers';

const AppointmentTime: AppointmentTimeResolvers = {
    duration({ duration }) {
        return duration;
    },
    start({ start }) {
        return start;
    },
};

export default AppointmentTime;
