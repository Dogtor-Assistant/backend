import type { AppointmentResolvers } from '@resolvers';

import Doctor from 'models/Doctor';
import Patient from 'models/Patient';
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
    async doctor({ doctorRef }) {
        const doctor = await Doctor.findById(doctorRef);
        if (doctor == null) {
            throw 'Doctor not found';
        }
        return doctor;
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
    notes({ patientNotes }) {
        return patientNotes ?? null;
    },
    async patient({ patientRef }) {
        const patient = await Patient.findById(patientRef);
        if (patient == null) {
            throw 'Patient not found!';
        }
        return patient;
    },
    async selectedServices() {
        throw 'Not implemented';
    },
    sharedData({ sharedData }) {
        return sharedData;
    },
};

export default Appointment;
