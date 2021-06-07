import type { Request as ExpressRequest, Response as ExpressResponse } from 'express';

export interface Request<T = unknown> extends ExpressRequest {
    body: T
}

export type Response<T = unknown> = ExpressResponse<T, Record<string, unknown>>
