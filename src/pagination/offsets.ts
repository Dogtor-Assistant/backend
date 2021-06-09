import type { ConnectionArguments } from 'graphql-relay';

import { cursorToOffset } from './cursors';

export function getOffsetWithDefault(
    cursor: string | null | undefined,
    defaultOffset: number,
) {
    if (cursor == null) {
        return defaultOffset;
    }
    const offset = cursorToOffset(cursor);
    return isNaN(offset) ? defaultOffset : offset;
}

export function getOffsetsFromArgs(
    { after, before, first, last }: ConnectionArguments,
    count: number,
    defaultPageSize?: number,
) {
    const beforeOffset = getOffsetWithDefault(before, count);
    const afterOffset = getOffsetWithDefault(after, -1);

    let startOffset = Math.max(-1, afterOffset) + 1;
    let endOffset = Math.min(count, beforeOffset);

    if (first != null) {
        endOffset = Math.min(endOffset, startOffset + first);
    }
    if (last != null) {
        startOffset = Math.max(startOffset, endOffset - last);
    }

    if (first == null && last == null && defaultPageSize != null) {
        if (before != null) {
            startOffset = Math.max(startOffset, endOffset - defaultPageSize);
        } else {
            endOffset = Math.min(endOffset, startOffset + defaultPageSize);
        }
    }

    const skip = Math.max(startOffset, 0);
    const limit = endOffset - startOffset;

    return {
        afterOffset: afterOffset,
        beforeOffset: beforeOffset,
        endOffset: endOffset,
        limit: limit,
        skip: skip,
        startOffset: startOffset,
    };
}
