import type { SmartSuggestions } from 'search/types';

import natural from 'natural';

// We could move this classifier later to be re-trained as we go
const classifier = new natural.BayesClassifier();
classifier.addDocument('My tooth hurts', 'Dentist');
classifier.addDocument('Gum\'s bleeding', 'Dentist');
classifier.addDocument('My teeth hurt when I eat ice cream', 'Dentist');
classifier.addDocument('I feel sad', 'Psychiatrist');
classifier.addDocument('I\'m depressed', 'Psychiatrist');
classifier.addDocument('I have anxiety', 'Psychiatrist');
classifier.addDocument('I have a weird mole', 'Dermatologist');
classifier.addDocument('I have a bad sunburn', 'Dermatologist');
classifier.addDocument('My skin feels strange', 'Dermatologist');
classifier.addDocument('It hurts when I go to the bathroom', 'Urologist');
classifier.addDocument('It hurts when I pee', 'Urologist');
classifier.addDocument('My urine looks strange', 'Urologist');
classifier.addDocument('I lost my balance', 'Neurologist');
classifier.addDocument('I\'m very confused', 'Neurologist');
classifier.addDocument('I have hallucinations', 'Neurologist');
classifier.addDocument('My kid needs to get vaccinated', 'Pediatrician');
classifier.addDocument('My kid is sick', 'Pediatrician');
classifier.addDocument('My baby vomitted', 'Pediatrician');
classifier.addDocument('My baby has a fever', 'Pediatrician');
classifier.addDocument('I need a physical', 'General Practicioner');
classifier.addDocument('My head hurts', 'General Practicioner');
classifier.addDocument('I am sick', 'General Practicioner');
classifier.addDocument('I think I have COVID', 'General Practicioner');
classifier.addDocument('My eyes hurt', 'Opthalmologist');
classifier.addDocument('I have trouble seeing properly', 'Opthalmologist');
classifier.addDocument('I feel too much pressure on my eyes', 'Opthalmologist');
classifier.addDocument('I need surgery', 'Surgeon');
classifier.train();

const suggestions: SmartSuggestions = async ({ query }) => {
    if (query == null) {
        return null;
    }

    const classifications = classifier.getClassifications(query);
    if (classifications.length === 0) {
        return null;
    }

    const average = classifications.
        reduce((acc, classification) => acc + classification.value, 0) / classifications.length;
        
    const valuable = classifications.
        filter(classification => classification.value >= Math.min(1.5 * average, average + 0.1)).
        map(classification => classification.label);

    if (valuable.length > 0 && valuable.length < 3) {
        return {
            specialities: valuable,
        };
    }
        
    return null;
};

export default suggestions;
