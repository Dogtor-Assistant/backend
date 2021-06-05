import type { UserResolvers } from '@resolvers';

import { buildId } from 'utils/ids';

const User: UserResolvers = {
    id({ id }) {
        return buildId('User', id);
    },
};

export default User;
