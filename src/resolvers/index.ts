
import type { Resolvers } from '@resolvers';

import ActivityLevel from './activityLevel';
import Address from './address';
import Appointment from './appointment';
import AppointmentTime from './appointmentTime';
import Checkup from './checkup';
import {
    AppointmentEdge,
    AppointmentsConnection,
    DoctorEdge,
    DoctorsConnection,
    PageInfo,
    PatientEdge,
    PatientsConnection,
    ReviewEdge,
    ReviewsConnection,
    ServiceEdge,
    ServicesConnection,
    UserEdge,
    UsersConnection,
} from './connections';
import Doctor from './doctor';
import Followup from './followup';
import Gender from './gender';
import Insurance from './insurance';
import Length from './length';
import Node from './node';
import OfferedSlot from './offeredSlot';
import Patient from './patient';
import Query from './query';
import Review from './review';
import Search from './search';
import SearchScope from './searchScope';
import SearchSuggestions from './searchSuggestions';
import Service from './service';
import User from './user';
import Weekday from './weekday';
import Weight from './weight';

import {
    GraphQLDateTime as DateTime,
    GraphQLDuration as Duration,
    GraphQLTime as Time,
    GraphQLURL as URL,
} from 'graphql-scalars';

const resolvers: Resolvers = {
    ActivityLevel,
    Address,
    Appointment,
    AppointmentEdge,
    AppointmentTime,
    AppointmentsConnection,
    Checkup,
    DateTime,
    Doctor,
    DoctorEdge,
    DoctorsConnection,
    Duration,
    Followup,
    Gender,
    Insurance,
    Length,
    Node,
    OfferedSlot,
    PageInfo,
    Patient,
    PatientEdge,
    PatientsConnection,
    Query,
    Review,
    ReviewEdge,
    ReviewsConnection,
    Search,
    SearchScope,
    SearchSuggestions,
    Service,
    ServiceEdge,
    ServicesConnection,
    Time,
    URL,
    User,
    UserEdge,
    UsersConnection,
    Weekday,
    Weight,
};

export default resolvers;
