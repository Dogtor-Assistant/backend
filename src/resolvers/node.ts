import type { NodeResolvers } from '@resolvers';

const Node: NodeResolvers = {
    __resolveType({ __typename }) {
        return __typename;
    },
};

export default Node;
