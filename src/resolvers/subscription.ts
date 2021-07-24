import type { SubscriptionResolvers } from 'utils/resolvers';

import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();

const Subscription: SubscriptionResolvers = {
    estimatedWaitingTime: {
        subscribe: (_, { id }) => pubsub.asyncIterator(`estimatedWaitingTime:${id}`),
    },

};

export default Subscription;
