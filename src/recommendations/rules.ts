
import type { InferenceRule, UserMedicalData } from './types';

export function show(): InferenceRule {
    return 'Show';
}

export function deny(): InferenceRule {
    return 'Deny';
}

export function showIf(
    condition: (data: UserMedicalData) => boolean,
): InferenceRule {
    return data => {
        if (condition(data)) {
            return 'Show';
        }
        return 'Skip';
    };
}

export function denyIf(
    condition: (data: UserMedicalData) => boolean,
): InferenceRule {
    return data => {
        if (condition(data)) {
            return 'Deny';
        }
        return 'Skip';
    };
}

function age(dateOfBirth: Date): number {
    const diff = Date.now() - dateOfBirth.getTime();
    const differenceAsDate = new Date(diff);
    return differenceAsDate.getFullYear() - 1970;
}

export function showIfAgeUnder(maximumAge: number, inclusive = true): InferenceRule {
    return showIf(({ dateOfBirth }) => {
        if (inclusive) {
            return age(dateOfBirth) <= maximumAge;
        }
        return age(dateOfBirth) < maximumAge;
    });
}

export function showIfAgeAbove(maximumAge: number, inclusive = true): InferenceRule {
    return showIf(({ dateOfBirth }) => {
        if (inclusive) {
            return age(dateOfBirth) >= maximumAge;
        }
        return age(dateOfBirth) > maximumAge;
    });
}

export function denyIfAgeUnder(maximumAge: number, inclusive = true): InferenceRule {
    return denyIf(({ dateOfBirth }) => {
        if (inclusive) {
            return age(dateOfBirth) <= maximumAge;
        }
        return age(dateOfBirth) < maximumAge;
    });
}

export function denyIfAgeAbove(maximumAge: number, inclusive = true): InferenceRule {
    return denyIf(({ dateOfBirth }) => {
        if (inclusive) {
            return age(dateOfBirth) >= maximumAge;
        }
        return age(dateOfBirth) > maximumAge;
    });
}

export function showIfPrivatelyInsured(): InferenceRule {
    return showIf(({ insurance }) => insurance === 'Private');
}

export function denyIfPrivatelyInsured(): InferenceRule {
    return denyIf(({ insurance }) => insurance === 'Private');
}

export function showIfPubcliclyInsured(): InferenceRule {
    return showIf(({ insurance }) => insurance === 'Public');
}

export function denyIfPubliclyInsured(): InferenceRule {
    return denyIf(({ insurance }) => insurance === 'Public');
}

export function showIfOfGender(requiredGender: NonNullable<UserMedicalData['gender']>): InferenceRule {
    return showIf(({ gender }) => gender === requiredGender);
}

export function denyIfOfGender(requiredGender: NonNullable<UserMedicalData['gender']>): InferenceRule {
    return denyIf(({ gender }) => gender === requiredGender);
}

export function showIfOnMedications(...expectedMedications: string[]): InferenceRule {
    if (expectedMedications.length === 0) {
        return showIf(({ medications }) => medications.length > 0);
    }
    return showIf(({ medications }) => expectedMedications.every(medication => medications.includes(medication)));
}

export function denyIfOnMedications(...expectedMedications: string[]): InferenceRule {
    if (expectedMedications.length === 0) {
        return denyIf(({ medications }) => medications.length > 0);
    }
    return denyIf(({ medications }) => expectedMedications.every(medication => medications.includes(medication)));
}

export function showIfHasMedicalCondition(...expectedConditions: string[]): InferenceRule {
    if (expectedConditions.length === 0) {
        return showIf(({ conditions }) => conditions.length > 0);
    }
    return showIf(({ conditions }) => conditions.every(condition => conditions.includes(condition)));
}

export function denyIfHasMedicalCondition(...expectedConditions: string[]): InferenceRule {
    if (expectedConditions.length === 0) {
        return denyIf(({ conditions }) => conditions.length > 0);
    }
    return denyIf(({ conditions }) => conditions.every(condition => conditions.includes(condition)));
}

