
import type {
    AppointmentEdgeResolvers,
    AppointmentsConnectionResolvers,
    DoctorEdgeResolvers,
    DoctorsConnectionResolvers,
    PageInfoResolvers,
    PatientEdgeResolvers,
    PatientsConnectionResolvers,
    ReviewEdgeResolvers,
    ReviewsConnectionResolvers,
    ServiceEdgeResolvers,
    ServicesConnectionResolvers,
    UserEdgeResolvers,
    UsersConnectionResolvers,
} from '@resolvers';
import type { Edge } from 'graphql-relay';
import type { Connection } from 'graphql-relay';

export const PageInfo: PageInfoResolvers = {
    endCursor({ endCursor }) {
        return endCursor;
    },
    hasNextPage({ hasNextPage }) {
        return hasNextPage;
    },
    hasPreviousPage({ hasPreviousPage }) {
        return hasPreviousPage;
    },
    startCursor({ startCursor }) {
        return startCursor;
    },
};

function edgeResolvers<T>() {
    return {
        cursor({ cursor }: Edge<T>) {
            return cursor;
        },
        node({ node }: Edge<T>) {
            return node;
        },
    };
}

function connectionResolvers<T>() {
    return {
        edges({ edges }: Connection<T>) {
            return edges;
        },
        pageInfo({ pageInfo }: Connection<T>) {
            return pageInfo;
        },
    };
}

export const ReviewEdge: ReviewEdgeResolvers = edgeResolvers();
export const ReviewsConnection: ReviewsConnectionResolvers = connectionResolvers();

export const UserEdge: UserEdgeResolvers = edgeResolvers();
export const UsersConnection: UsersConnectionResolvers = connectionResolvers();

export const DoctorEdge: DoctorEdgeResolvers = edgeResolvers();
export const DoctorsConnection: DoctorsConnectionResolvers = connectionResolvers();

export const PatientEdge: PatientEdgeResolvers = edgeResolvers();
export const PatientsConnection: PatientsConnectionResolvers = connectionResolvers();

export const ServiceEdge: ServiceEdgeResolvers = edgeResolvers();
export const ServicesConnection: ServicesConnectionResolvers = connectionResolvers();

export const AppointmentEdge: AppointmentEdgeResolvers = edgeResolvers();
export const AppointmentsConnection: AppointmentsConnectionResolvers = connectionResolvers();
