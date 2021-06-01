
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    # An object with a Globally Unique ID
    interface Node {
        # The ID of the object.
        id: ID!
    }

    type User implements Node {
        id: ID!
    }

    type Query {
        greeting: String!
        me: User
        node(id: ID!): Node
    }

    schema {
        query: Query
    }
`;
