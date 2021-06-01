
import type { QueryResolvers } from '@resolvers';
import type { Context } from 'context';

const Query: QueryResolvers<Context> = {
    greeting(_0, _1, context) {
        if (context.authenticated != null) {
            return `Hello, User ${context.authenticated.id}`;
        }

        return 'Hello World';
    },
    me(_0, _1, context) {
        if (context.authenticated == null) {
            return null;
        }

        return {
            __typename: 'User',
            id: context.authenticated.id,
        };
    },
    node(_, { id }) {
        // TODO: perform lookup
        return {
            id,
        };
    },
};

export default Query;
