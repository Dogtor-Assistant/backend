import type { Context } from 'context';
import type { SmartSuggestions } from 'search/types';

import { Patient } from 'shims/patient';
import { cityForIp } from 'utils/ip';

async function userCity(context: Context): Promise<string | null> {
    if (context.authenticated != null) {
        const { patientRef } = await context.authenticated.full();
        if (patientRef != null) {
            const patient = new Patient(patientRef);
            const { address } = await patient.full();
            return address.city;
        }
    }

    return null;
}

async function clientCity(context: Context): Promise<string | null> {
    try {
        return await cityForIp(context.ip);
    } catch {
        return null;
    }
}

const suggestions: SmartSuggestions = async ({ cities }, context) => {
    if (cities != null && cities.length > 0) {
        return null;
    }

    const possibleCities = [
        await userCity(context),
        await clientCity(context),
    ];

    const values = possibleCities.
        compactMap(value => value).
        unique();

    if (values.length > 0) {
        return {
            cities: values,
        };
    }

    return null;
};

export default suggestions;
