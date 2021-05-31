
import Query from './query';

import { GraphQLSchema } from 'graphql';

const Schema = new GraphQLSchema(
    {
        query: Query,
    },
);

export default Schema;
