
import type { QueryResolvers } from '@resolvers';

import { deconstructId } from 'utils/ids';

const Query: QueryResolvers = {
    greeting(_0, _1, { authenticated }) {
        if (authenticated != null) {
            return `Hello, User ${authenticated.id}`;
        }

        return 'Hello World';
    },
    me(_0, _1, { authenticated }) {
        if (authenticated == null) {
            return null;
        }

        return {
            __typename: 'User',
            id: authenticated.id,
        };
    },
    node(_, { id: nodeId }) {
        const deconstructed = deconstructId(nodeId);
        if (deconstructed == null) {
            return null;
        }

        const [nodeType, id] = deconstructed;
        // TODO: fetch from DB
        return {
            __typename: nodeType,
            id,
        };
    },
};

export default Query;
