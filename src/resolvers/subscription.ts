import type { SubscriptionResolvers } from 'utils/resolvers';

import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();

const Subscription: SubscriptionResolvers = {
    appointmentFinished: {
        subscribe: () => pubsub.asyncIterator('appointmentFinished'),
    },
};

export default Subscription;
