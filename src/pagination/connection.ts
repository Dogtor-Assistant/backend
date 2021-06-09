
import type { Connection, ConnectionArguments } from 'graphql-relay';
import type { Document, Query } from 'mongoose';

import { connectionFromMongooseQuery } from './query';

import { connectionFromArray } from 'graphql-relay';

export type ConnectionQuery<T extends Document, S = never> = Query<T[], T> | T[] | S[]

const DEFAULT_PAGE_SIZE = 20;

export async function connectionFrom<T extends Document, O, S = never>(
    query: ConnectionQuery<T, S>,
    args: ConnectionArguments,
    mapper: (node: T | S) => O,
): Promise<Connection<O>> {
    if ('_mongooseOptions' in query) {
        return await connectionFromMongooseQuery(query, args, mapper, DEFAULT_PAGE_SIZE);
    }
    
    const array = query.map(mapper);
    return connectionFromArray(array, args);
}
