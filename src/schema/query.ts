
import type { Context } from 'context';

import {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';

const Query = new GraphQLObjectType<Record<string, never>, Context>(
    {
        fields: {
            'greeting': {
                resolve(source, args, context) {
                    if (context.authenticated != null) {
                        return `Hello, User ${context.authenticated.id}`;
                    }

                    return 'Hello World';
                },
                type: GraphQLNonNull(GraphQLString),
            },
        },
        name: 'Query',
    },
);

export default Query;
