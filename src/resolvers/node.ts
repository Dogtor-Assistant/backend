import type { NodeResolvers } from '@resolvers';
import type { Context } from 'context';

const Node: NodeResolvers<Context> = {
    __resolveType() {
        // TODO: use some euristic to detect the type based on the ID
        return 'User';
    },
};

export default Node;
