
import type { QueryResolvers } from '@resolvers';
import type { Context } from 'context';

const Query: QueryResolvers<Context> = {
    greeting(_0, _1, context) {
        if (context.authenticated != null) {
            return `Hello, User ${context.authenticated.id}`;
        }

        return 'Hello World';
    },
};

export default Query;
