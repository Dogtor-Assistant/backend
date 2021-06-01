
import type { QueryResolvers } from '@resolvers';
import type { Context } from 'context';

const Query: QueryResolvers<Context> = {
    greeting(_0, _1, { authenticated }) {
        if (authenticated != null) {
            return `Hello, User ${authenticated.id}`;
        }

        return 'Hello World';
    },
    me(_0, _1, { authenticated }) {
        if (authenticated == null) {
            return null;
        }

        return {
            id: authenticated.id,
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
