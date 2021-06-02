
import type { QueryResolvers } from '@resolvers';

const Query: QueryResolvers = {
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
