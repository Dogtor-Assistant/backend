import type { UserResolvers } from '@resolvers';
import type { Context } from 'context';

const User: UserResolvers<Context> = {
    id({ id }) {
        return id;
    },
};

export default User;
