
import type { Connection, ConnectionArguments } from 'graphql-relay';
import type { Document, Query } from 'mongoose';

import { getOffsetsFromArgs } from './offsets';
import { getConnectionFromSlice } from './slicing';

export async function connectionFromMongooseQuery<T extends Document, O>(
    query: Query<T[], T>,
    args: ConnectionArguments,
    mapper: (node: T) => O,
): Promise<Connection<O>> {
    const count = await query.count();
    const pagination = getOffsetsFromArgs(args, count);

    if (pagination.limit === 0) {
        return getConnectionFromSlice([], mapper, args, count);
    }

    query.skip(pagination.skip);
    query.limit(pagination.limit);

    // Convert all Mongoose documents to objects
    query.lean();

    const slice = await query.find();
    return getConnectionFromSlice(slice, mapper, args, count);
}
