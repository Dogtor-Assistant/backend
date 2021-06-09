
import type { Connection, ConnectionArguments } from 'graphql-relay';
import type { Document } from 'mongoose';

import { offsetToCursor } from './cursors';
import { getOffsetsFromArgs } from './offsets';

export function getConnectionFromSlice<T extends Document, O>(
    slice: T[],
    mapper: (node: T) => O,
    args: ConnectionArguments,
    count: number,
    defaultPageSize?: number,
) : Connection<O> {
    const first = args.first;
    const last = args.last;
    const before = args.before;
    const after = args.after;

    const offsetsFromArgs = getOffsetsFromArgs(args, count, defaultPageSize);
    const startOffset = offsetsFromArgs.startOffset;
    const endOffset = offsetsFromArgs.endOffset;
    const beforeOffset = offsetsFromArgs.beforeOffset;
    const afterOffset = offsetsFromArgs.afterOffset;

    const edges = slice.map((node, index) => {
        return {
            cursor: offsetToCursor(startOffset + index),
            node: mapper(node),
        };
    });

    const firstEdge = edges[0];
    const lastEdge = edges[edges.length - 1];
    const lowerBound = after ? afterOffset + 1 : 0;
    const upperBound = before ? Math.min(beforeOffset, count) : count;

    return {
        edges: edges,
        pageInfo: {
            endCursor: lastEdge ? lastEdge.cursor : null,
            hasNextPage: first != null ? endOffset < upperBound : false,
            hasPreviousPage: last != null ? startOffset > lowerBound : false,
            startCursor: firstEdge ? firstEdge.cursor : null,
        },
    };
}
