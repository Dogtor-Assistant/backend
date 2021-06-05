import type { Request } from 'express';

export type Context = {
    authenticated: {
        id: string
    } | null
}

export function context(request: Request): Context {
    return {
        authenticated: request.authenticated,
    };
}
