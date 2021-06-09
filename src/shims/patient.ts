
import type { IMiniPatient as AppointmentPatient } from 'models/Appointment';
import type { IMiniPatient as CheckupPatient } from 'models/Checkup';
import type { IMiniPatient as FollowupPatient } from 'models/Followup';
import type { IPatient } from 'models/Patient';
import type { IMiniPatient as ReviewPatient } from 'models/Review';
import type { IUser } from 'models/User';

import PatientModel from 'models/Patient';
import User from 'models/User';
import { ObjectID } from 'mongodb';
import { buildId } from 'utils/ids';

export type PatientInput =
    IPatient | AppointmentPatient | CheckupPatient | FollowupPatient | ReviewPatient | string | ObjectID

function getId(input: PatientInput): string {
    if (typeof input === 'string') {
        return input;
    }

    if (input instanceof ObjectID) {
        return input.toHexString();
    }

    if ('address' in input && input._id != null) {
        return input._id;
    }

    if ('patientId' in input && input.patientId != null) {
        return input.patientId;
    }
    
    throw 'Uninitialized Value!';
}

export class Patient {
    __typename: 'Patient'
    _input: PatientInput
    _full: Promise<IPatient> | null
    _user: Promise<IUser> | null

    constructor(input: PatientInput) {
        this.__typename = 'Patient';
        this._input = input;
        this._full = null;
        this._user = null;
    }

    id() {
        const id = getId(this._input);
        return buildId('Patient', id);
    }

    async full() {
        if (typeof this._input === 'object' && 'address' in this._input) {
            return this._input;
        }

        if (this._full != null) {
            return await this._full;
        }

        const id = getId(this._input);
        const promise = PatientModel.
            findById(id).
            then(patient => {
                if (patient == null) {
                    throw 'Patient not found!';
                }
                return patient;
            });

        this._full = promise;
        return await promise;
    }

    async user() {
        if (this._user != null) {
            return await this._user;
        }

        const id = getId(this._input);
        const promise = User.
            findOne({ patientRef: id }).
            then(user => {
                if (user == null) {
                    throw 'User for patient not found!';
                }
                return user;
            });

        this._user = promise;
        return await promise;
    }
}

export async function patient(id: string | ObjectID): Promise<Patient | null> {
    const value = await PatientModel.findById(id);
    return value && new Patient(value);
}
