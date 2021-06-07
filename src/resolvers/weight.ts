import type { WeightScalarConfig } from '@resolvers';

import { GraphQLScalarType, Kind } from 'graphql';

const config: WeightScalarConfig = {
    name: 'Weight',
    parseLiteral(ast) {
        if (ast.kind === Kind.INT || ast.kind === Kind.FLOAT) {
            return Number(ast.value);
        }

        return null;
    },
    parseValue(value) {
        if (typeof value === 'number') {
            return value;
        }

        return null;
    },
    serialize(value) {
        return value;
    },
};

const Weight = new GraphQLScalarType(config);

export default Weight;
