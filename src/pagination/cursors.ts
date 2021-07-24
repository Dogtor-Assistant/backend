
const PREFIX = 'mongodbconnection:';

export function offsetToCursor(offset: number): string {
    return Buffer.from(PREFIX + offset, 'ascii').toString('base64');
}

export function cursorToOffset(cursor: string) {
    const decoded = Buffer.from(cursor, 'base64').toString('ascii');
    return parseInt(decoded.substring(PREFIX.length));
}
