import type {
    Request as ExpressRequest,
    Response as ExpressResponse,
} from 'express';

export interface Request<T = unknown> extends ExpressRequest {
    body: T
}

export type Response<T = unknown> = ExpressResponse<T, Record<string, unknown>>

type UnionToIntersection<U> =
  (U extends unknown ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never
type LastOf<T> =
  UnionToIntersection<T extends unknown ? () => T : never> extends () => (infer R) ? R : never

type Push<T extends unknown[], V> = [...T, V];

export type TuplifyUnion<T, L = LastOf<T>, N = [T] extends [never] ? true : false> =
  true extends N ? [] : Push<TuplifyUnion<Exclude<T, L>>, L>
