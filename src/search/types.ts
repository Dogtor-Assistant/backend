
import type { Context } from 'context';
import type { IDoctor } from 'models/Doctor';
import type { FilterQuery } from 'mongoose';

export type AppliedFilters = {
    readonly specialities?: string[]
    readonly cities?: string[]
}

export type Scope = AppliedFilters & {
    readonly query?: string,
}

export type Suggestions = {
    readonly specialities?: string[]
    readonly cities?: string[]
}

export type SmartFilter = {
    languageTag: string,
    filterFromInput: (filters: AppliedFilters) => (FilterQuery<IDoctor> | null)
    filterFromWords: (words: string[]) => [FilterQuery<IDoctor>, AppliedFilters]
}

export type SmartSuggestions = {
    create: (scope: Scope, context: Context) => Promise<Suggestions | null>;
}
