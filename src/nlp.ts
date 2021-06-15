
import nlp from 'compromise';

const specialties = <const> [
    'General Practicioner',
    'Dentist',
    'Dermatologist',
    'Neurologist',
    'Opthalmologist',
    'Surgeon',
    'Urologist',
    'Pediatrician',
    'Pathologist',
    'Psychiatrist',
];

const wordsMap = Object.fromEntries(specialties.map(specialty => [specialty, 'Specialty']));

function TagServicesPlugin(_: unknown, world: nlp.World) {
    world.addTags({
        Specialty: {},
    });

    world.addWords(wordsMap);
}

nlp.extend(TagServicesPlugin);

export default nlp;
