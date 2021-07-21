import type { Context } from 'context';
import type { IAddress } from 'models/common/Address';
import type { SmartSuggestions } from 'search/types';

import { Patient } from 'shims/patient';
import { cityForIp } from 'utils/ip';

const DEFAULT_DISTANCE_FROM_HOME_ADDRESS = 3_000;

async function userAddress(context: Context): Promise<IAddress | null> {
    if (context.authenticated != null) {
        const { patientRef } = await context.authenticated.full();
        if (patientRef != null) {
            const patient = new Patient(patientRef);
            const { address } = await patient.full();
            return address;
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

const suggestions: SmartSuggestions = async ({ cities, nearby }, context) => {
    if (nearby != null || (cities != null && cities.length > 0)) {
        return null;
    }

    const addressForUser = await userAddress(context);
    if (addressForUser != null) {
        const [longitude, latitude] = addressForUser.location.coordinates;
        return {
            nearby: {
                coordinates: {
                    latitude,
                    longitude,
                },
                label: `${addressForUser.streetName} ${addressForUser.streetNumber}`,
                maximumDistanceInMeters: DEFAULT_DISTANCE_FROM_HOME_ADDRESS,
            },
        };
    }
    
    const currentCity = await clientCity(context);
    if (currentCity != null) {
        return {
            cities: [
                currentCity,
            ],
        };
    }

    return null;
};

export default suggestions;
