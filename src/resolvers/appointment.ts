import type { AppointmentResolvers } from '@resolvers';

import { Doctor } from 'shims/doctor';
import { Patient } from 'shims/patient';
import { Service } from 'shims/service';
import { buildId } from 'utils/ids';

const Appointment: AppointmentResolvers = {
    actualTime({ actualDuration, actualTime }) {
        if (actualDuration == null || actualTime == null) {
            return null;
        }
        return {
            duration: actualDuration,
            start: actualTime,
        };
    },
    doctor({ doctorRef }) {
        return new Doctor(doctorRef);
    },
    expectedTime({ expectedDuration, expectedTime }) {
        return {
            duration: expectedDuration,
            start: expectedTime,
        };
    },
    id({ _id: id }) {
        if (id == null) {
            throw 'Uninitialized Value!';
        }
        return buildId('Appointment', id);
    },
    insurance({ insurance }) {
        return insurance;
    },
    isDone({ actualTime }) {
        return actualTime != null;
    },
    notes({ patientNotes }) {
        return patientNotes ?? null;
    },
    patient({ patientRef }) {
        return new Patient(patientRef);
    },
    selectedServices({ selectedServices }) {
        return selectedServices?.map(service => new Service(service)) ?? [];
    },
    sharedData({ sharedData }) {
        return sharedData;
    },
};

export default Appointment;
