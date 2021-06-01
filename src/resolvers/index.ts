
import type { Resolvers } from '@resolvers';
import type { Context } from 'context';

import Query from './query';
import User from './user';

const resolvers: Resolvers<Context> = {
    Query,
    User,
};

export default resolvers;
