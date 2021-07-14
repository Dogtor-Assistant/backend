
import type { QuerySearchArgs, RequireFields } from '@resolvers';
import type { Context } from 'context';
import type { IDoctor } from 'models/Doctor';
import type { FilterQuery, Query } from 'mongoose';

export type AppliedFilters = {
    readonly specialities?: string[],
    readonly cities?: string[],
}

export type Scope = AppliedFilters & {
    readonly query?: string,
}

export type Suggestions = {
    readonly specialities?: string[],
    readonly cities?: string[],
}

export type SmartScopeModifier = ((scope: Scope) => Scope) | SmartScopeModifier[]

export type QueryGenerator = ((scope: Scope) => FilterQuery<IDoctor> | null) | QueryGenerator[]

export type SmartSuggestions = {
    create: (scope: Scope, context: Context) => Promise<Suggestions | null>,
}

export type SearchObject = {
    __typename: 'Search',
    input: RequireFields<QuerySearchArgs, never>,
    query: Query<IDoctor[], IDoctor>,
    scope: Scope,
    suggestions: Suggestions,
}
