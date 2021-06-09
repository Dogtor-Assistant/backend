
import type { ConnectionQuery } from './connection';
import type {
    Connection,
    ConnectionArguments,
    Edge,
    PageInfo as RelayPageInfo,
} from 'graphql-relay';
import type { IAppointment } from 'models/Appointment';
import type { IDoctor } from 'models/Doctor';
import type { IPatient } from 'models/Patient';
import type { IReview } from 'models/Review';
import type { IService } from 'models/Service';
import type { IUser } from 'models/User';
import type { DoctorInput } from 'shims/doctor';
import type { PatientInput } from 'shims/patient';
import type { ReviewInput } from 'shims/review';
import type { ServiceInput } from 'shims/service';
import type { UserInput } from 'shims/user';

import { connectionFrom } from './connection';

import { Doctor } from 'shims/doctor';
import { Patient } from 'shims/patient';
import { Review } from 'shims/review';
import { Service } from 'shims/service';
import { User } from 'shims/user';

export type PageInfo = RelayPageInfo;
export type ReviewsConnection = Connection<Review>
export type UsersConnection = Connection<User>
export type DoctorsConnection = Connection<Doctor>
export type PatientsConnection = Connection<Patient>
export type ServicesConnection = Connection<Service>
export type AppointmentsConnection = Connection<IAppointment>

export type ReviewEdge = Edge<Review>
export type UserEdge = Edge<User>
export type DoctorEdge = Edge<Doctor>
export type PatientEdge = Edge<Patient>
export type ServiceEdge = Edge<Service>
export type AppointmentEdge = Edge<IAppointment>

export async function reviewsConnection(
    query: ConnectionQuery<IReview, ReviewInput>,
    args: ConnectionArguments,
): Promise<ReviewsConnection> {
    return await connectionFrom(query, args, node => new Review(node));
}

export async function usersConnection(
    query: ConnectionQuery<IUser, UserInput>,
    args: ConnectionArguments,
): Promise<UsersConnection> {
    return await connectionFrom(query, args, node => new User(node));
}

export async function doctorsConnection(
    query: ConnectionQuery<IDoctor, DoctorInput>,
    args: ConnectionArguments,
): Promise<DoctorsConnection> {
    return await connectionFrom(query, args, node => new Doctor(node));
}

export async function servicesConnection(
    query: ConnectionQuery<IService, ServiceInput>,
    args: ConnectionArguments,
): Promise<ServicesConnection> {
    return await connectionFrom(query, args, node => new Service(node));
}

export async function patientsConnection(
    query: ConnectionQuery<IPatient, PatientInput>,
    args: ConnectionArguments,
): Promise<PatientsConnection> {
    return await connectionFrom(query, args, node => new Patient(node));
}

export async function appointmentsConnection(
    query: ConnectionQuery<IAppointment>,
    args: ConnectionArguments,
): Promise<AppointmentsConnection> {
    return await connectionFrom(query, args, node => node);
}
