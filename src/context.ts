import type { Request } from 'express';

import { User } from 'shims/user';

export type Context = {
    ip: string,
    authenticated: User | null,
}

export function context(request: Request): Context {
    return {
        authenticated: request.authenticated && new User(request.authenticated.id),
        ip: request.ip,
    };
}
