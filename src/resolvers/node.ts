import type { NodeResolvers } from '@resolvers';

const Node: NodeResolvers = {
    __resolveType() {
        // TODO: use some euristic to detect the type based on the ID
        return 'User';
    },
};

export default Node;
