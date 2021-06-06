
import type { Resolvers } from '@resolvers';

import ActivityLevel from './activityLevel';
import Address from './address';
import Appointment from './appointment';
import AppointmentTime from './appointmentTime';
import Checkup from './checkup';
import Doctor from './doctor';
import Followup from './followup';
import Gender from './gender';
import Insurance from './insurance';
import Node from './node';
import OfferedSlot from './offeredSlot';
import Patient from './patient';
import Query from './query';
import Review from './review';
import User from './user';
import Weekday from './weekday';

const resolvers: Resolvers = {
    ActivityLevel,
    Address,
    Appointment,
    AppointmentTime,
    Checkup,
    Doctor,
    Followup,
    Gender,
    Insurance,
    Node,
    OfferedSlot,
    Patient,
    Query,
    Review,
    User,
    Weekday,
};

export default resolvers;
