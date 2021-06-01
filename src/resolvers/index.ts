
import type { Resolvers } from '@resolvers';
import type { Context } from 'context';

import Node from './node';
import Query from './query';
import User from './user';

const resolvers: Resolvers<Context> = {
    Node,
    Query,
    User,
};

export default resolvers;
