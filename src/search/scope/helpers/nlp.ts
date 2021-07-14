
import nlp from 'nlp';

function nlpImpl(query: string, tag: string): [string | undefined, string[]] | undefined {
    const document = nlp(query);
    const matches = document.match(`#${tag}+`).toTitleCase().out('array');

    if (matches.length < 1) {
        return undefined;
    }

    const skipped = matches.map(match => match.toLowerCase());
    const tags = document.out('tags')[0];
    const allWords = tags != null ? Object.keys(tags).filter(word => !skipped.includes(word.toLowerCase())) : [];
    
    return [
        allWords.length > 0 ? allWords.join(' ') : undefined,
        matches,
    ];
}

export default nlpImpl;
