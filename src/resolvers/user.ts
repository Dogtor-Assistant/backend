import type { UserResolvers } from '@resolvers';

const User: UserResolvers = {
    id({ id }) {
        return id;
    },
};

export default User;
