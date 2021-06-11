import type { AppliedFilters, SmartFilter } from './types';
import type { IDoctor } from 'models/Doctor';
import type { FilterQuery, Query } from 'mongoose';

import Doctor from 'models/Doctor';
import nlp from 'nlp';
import defaultFilters from 'search/filters';
import { zip } from 'utils/zip';

export type Input = AppliedFilters & {
    query?: string,
}

export function search(
    { query, ...appliedFilters }: Input,
    smartFilters: SmartFilter[] = defaultFilters,
): Query<IDoctor[], IDoctor> {
    const document = nlp(query ?? '');
    document?.contractions().expand();
    document?.dehyphenate();

    const filtersFromInput = smartFilters.map(({ filterFromInput }) => filterFromInput(appliedFilters));
    const wordsForFilters = zip(smartFilters, filtersFromInput).map(([{ languageTag }, filterFromInput]) => {
        // If there's already a filter applied to the input, don't apply another one
        if (filterFromInput != null) {
            return [];
        }
        return document.match(`#${languageTag}+`).out('array');
    });

    const filters = zip(smartFilters, wordsForFilters, filtersFromInput).
        map(([{ filterFromWords }, words, filterFromInput]) => {
            if (filterFromInput != null) {
                return filterFromInput;
            }

            return words.length > 0 ? filterFromWords(words)[0] : {};
        });

    // skip words like `in` and `for`
    const unimportant = [
        document.adverbs().out('array'),
        document.prepositions().out('array'),
    ].flatMap(items => items);

    // Skip words derived for a filter
    const skippedWords = [...wordsForFilters.flatMap(words => words), ...unimportant];
    const allWords = Object.keys(document.out('tags')[0]);
    const additionalWords = allWords.filter(item => !skippedWords.includes(item));

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
        
    return Doctor.
        find(
            composed,
        ).
        sort(
            {
                rating: -1,
            },
        );
}
