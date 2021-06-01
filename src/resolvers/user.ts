import type { UserResolvers } from '@resolvers';
import type { Context } from 'context';

const User: UserResolvers<Context> = {
    id(source) {
        return source.id;
    },
};

export default User;
