import type {
    AppliedFilters,
    Scope,
    SmartFilter,
    SmartSuggestions,
    Suggestions,
} from './types';
import type { Context } from 'context';
import type { IDoctor } from 'models/Doctor';
import type { FilterQuery, Query } from 'mongoose';

import Doctor from 'models/Doctor';
import nlp from 'nlp';
import defaultFilters from 'search/filters';
import defaultSuggestions from 'search/suggestions';
import { zip } from 'utils/zip';

export async function search(
    { query, ...appliedFilters }: Scope,
    context: Context,
    smartFilters: SmartFilter[] = defaultFilters,
    smartSuggestions: SmartSuggestions[] = defaultSuggestions,
): Promise<[Query<IDoctor[], IDoctor>, Scope, Suggestions]> {
    const document = nlp(query ?? '');
    document?.contractions().expand();
    document?.dehyphenate();

    const filtersFromInput = smartFilters.map(({ filterFromInput }) => filterFromInput(appliedFilters));
    const wordsForFilters = zip(smartFilters, filtersFromInput).map(([{ languageTag }, filterFromInput]) => {
        // If there's already a filter applied to the input, don't apply another one
        if (filterFromInput != null) {
            return [];
        }
        return document.match(`#${languageTag}+`).toTitleCase().out('array');
    });

    const filtersAndScopes: [FilterQuery<IDoctor>, AppliedFilters][] =
        zip(smartFilters, wordsForFilters, filtersFromInput).
            map(([{ filterFromWords }, words, filterFromInput]) => {
                if (filterFromInput != null) {
                    return [filterFromInput, {} as AppliedFilters];
                }

                return words.length > 0 ? filterFromWords(words) : [{}, {} as AppliedFilters];
            });

    const filters = filtersAndScopes.map(tuple => tuple[0]);
    const scopes = filtersAndScopes.map(tuple => tuple[1]);
    const newAppliedFilters = scopes.reduce((acc, scope) => {
        return {
            ...acc,
            ...scope,
        };
    }, appliedFilters);

    // skip words like `in` and `for`
    const unimportant = [
        document.adverbs().out('array'),
        document.prepositions().out('array'),
        document.conjunctions().out('array'),
    ].flatMap(items => items);

    // Skip words derived for a filter
    const skippedWords = [...wordsForFilters.flatMap(words => words), ...unimportant].map(word => word.toLowerCase());
    const tags = document.out('tags')[0];
    const allWords = tags != null ? Object.keys(tags) : [];
    const additionalWords = allWords.filter(item => !skippedWords.includes(item.toLowerCase()));

    const queries: FilterQuery<IDoctor>[] = [
        ...filters,
        additionalWords.length > 0 ? {
            $text: {
                $caseSensitive: false,
                $diacriticSensitive: false,
                $search: additionalWords.join(' '),
            },
        } : {},
    ];

    const composed = queries.reduce((acc, query) => {
        if (query != null) {
            return {
                ...acc,
                ...query,
            };
        }

        return acc;
    }) ?? {};
        
    const dbQuery = Doctor.
        find(
            composed,
        ).
        sort(
            {
                rating: -1,
            },
        );

    const scope = {
        query: additionalWords.length > 0 ? additionalWords.join(' ') : undefined,
        ...newAppliedFilters,
    };

    const partialSuggestions = await Promise.all(
        smartSuggestions.map(suggestion => suggestion.create(scope, context)),
    );

    const suggestions = partialSuggestions.reduce((acc, object) => {
        if (object == null) {
            return acc;
        }
        return {
            ...acc,
            ...object,
        };
    }) ?? {};

    return [
        dbQuery,
        scope,
        suggestions,
    ];
}
