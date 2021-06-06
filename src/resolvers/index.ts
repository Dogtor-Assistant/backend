
import type { Resolvers } from '@resolvers';

import ActivityLevel from './activityLevel';
import Address from './address';
import Appointment from './appointment';
import AppointmentTime from './appointmentTime';
import Checkup from './checkup';
import Doctor from './doctor';
import Gender from './gender';
import Insurance from './insurance';
import Node from './node';
import Query from './query';
import User from './user';
import Weekday from './weekday';

const resolvers: Resolvers = {
    ActivityLevel,
    Address,
    Appointment,
    AppointmentTime,
    Checkup,
    Doctor,
    Gender,
    Insurance,
    Node,
    Query,
    User,
    Weekday,
};

export default resolvers;
