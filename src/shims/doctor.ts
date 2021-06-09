import type { IMiniDoctor as AppointmentDoctor } from 'models/Appointment';
import type { IDoctor } from 'models/Doctor';
import type { IMiniDoctor as FollowupDoctor } from 'models/Followup';
import type { IUser } from 'models/User';

import DoctorModel from 'models/Doctor';
import User from 'models/User';
import { ObjectID } from 'mongodb';
import { buildId } from 'utils/ids';

export type DoctorInput = IDoctor | FollowupDoctor | AppointmentDoctor | string | ObjectID

function getId(input: DoctorInput): string {
    if (typeof input === 'string') {
        return input;
    }

    if (input instanceof ObjectID) {
        return input.toHexString();
    }

    if ('address' in input && input._id != null) {
        return input._id;
    }

    if ('doctorId' in input && input.doctorId != null) {
        return input.doctorId;
    }

    throw 'Uninitialized Value!';
}

export class Doctor {
    __typename: 'Doctor'
    _input: DoctorInput
    _full: Promise<IDoctor> | null
    _user: Promise<IUser> | null

    constructor(input: DoctorInput) {
        this.__typename = 'Doctor';
        this._input = input;
        this._full = null;
        this._user = null;
    }

    id() {
        const id = getId(this._input);
        return buildId('Doctor', id);
    }

    async full(): Promise<IDoctor> {
        if (typeof this._input === 'object' && 'address' in this._input) {
            return this._input;
        }

        if (this._full != null) {
            return await this._full;
        }

        const id = getId(this._input);
        const promise = DoctorModel.
            findById(id).
            then(value => {
                if (value == null) {
                    throw 'Doctor not found!';
                }
                return value;
            });

        this._full = promise;
        return await promise;
    }

    async user(): Promise<IUser> {
        if (this._user != null) {
            return await this._user;
        }

        const id = getId(this._input);
        const promise = User.
            findOne({ doctorRef: id }).
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

export async function doctor(id: string | ObjectID): Promise<Doctor | null> {
    const value = await DoctorModel.findById(id);
    return value && new Doctor(value);
}
