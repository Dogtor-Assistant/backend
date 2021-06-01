
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type Query {
        greeting: String!
        me: User
    }

    type User {
        id: String!
    }

    schema {
        query: Query
    }
`;
