import type {
    QueryGenerator,
    Scope,
    SearchObject,
    SmartScopeModifier,
    SmartSuggestions,
    Suggestions,
} from './types';
import type { QuerySearchArgs, RequireFields } from '@resolvers';
import type { Context } from 'context';
import type { IDoctor } from 'models/Doctor';
import type { FilterQuery } from 'mongoose';

import Doctor from 'models/Doctor';
import defaultGenerator from 'search/query';
import defaultModifier from 'search/scope';
import defaultSuggestions from 'search/suggestions';

function modify(scope: Scope, modifier: SmartScopeModifier): Scope {
    switch (typeof modifier) {
    case 'function':
        return modifier(scope);
    case 'object':
        return modifier.reduce(modify, scope);
    }
}

function generate(scope: Scope, generator: QueryGenerator): FilterQuery<IDoctor> {
    switch (typeof generator) {
    case 'function':
        return generator(scope) ?? {};
    case 'object':
        return generator.
            map(element => generate(scope, element)).
            reduce((acc, partial) => {
                return {
                    ...acc,
                    ...partial,
                };
            }, {});
    }
}

async function suggest(
    scope: Scope,
    context: Context,
    suggestions: SmartSuggestions,
): Promise<Suggestions> {
    switch (typeof suggestions) {
    case 'function': {
        const result = await suggestions(scope, context);
        return result ?? {};
    }
    case 'object': {
        const partialSuggestions = await Promise.all(
            suggestions.map(element => suggest(scope, context, element)),
        );

        return partialSuggestions.reduce((acc, object) => {
            if (object == null) {
                return acc;
            }
            return {
                ...acc,
                ...object,
            };
        }) ?? {};
    }
    }
}

function isScopeEmpty(scope: Scope) {
    const scopeRecord = scope as Record<string, unknown>;
    const keys = Object.keys(scopeRecord);
    for (const key of keys) {
        if (scopeRecord[key] != null) {
            return false;
        }
    }
    return true;
}

async function searchImpl(
    scope: Scope,
    context: Context,
    modifier: SmartScopeModifier,
    generator: QueryGenerator,
    smartSuggestions: SmartSuggestions,
): Promise<Omit<Omit<SearchObject, 'input'>, '__typename'>> {
    const actualScope = modify(scope, modifier);
    if (isScopeEmpty(actualScope)) {
        return {
            query: null,
            scope: {},
            suggestions: {},
        };
    }
    const composedQuery = generate(actualScope, generator);
        
    const dbQuery = Doctor.
        find(
            composedQuery,
        ).
        sort(
            {
                rating: -1,
            },
        );
        
    const suggestions = await suggest(actualScope, context, smartSuggestions);

    return {
        query: dbQuery,
        scope: actualScope,
        suggestions,
    };
}

export async function search(
    input: RequireFields<QuerySearchArgs, never>,
    context: Context,
    modifier: SmartScopeModifier = defaultModifier,
    generator: QueryGenerator = defaultGenerator,
    smartSuggestions: SmartSuggestions = defaultSuggestions,
): Promise<SearchObject> {
    const results = await searchImpl(
        {
            cities: input.cities != null ? [...input.cities] : undefined,
            minRating: input.minRating ?? undefined,
            nearby: input.nearby ?? undefined,
            query: input.query ?? undefined,
            specialities: input.specialities != null ? [...input.specialities] : undefined,
        },
        context,
        modifier,
        generator,
        smartSuggestions,
    );

    return {
        __typename: 'Search',
        input,
        ...results,
    };
}
