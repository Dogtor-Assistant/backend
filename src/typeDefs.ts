
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type Query {
        greeting: String!
    }

    schema {
        query: Query
    }
`;
