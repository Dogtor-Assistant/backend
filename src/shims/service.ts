import type { IMiniService as AppointmentService } from 'models/Appointment';
import type { IMiniService as DoctorService } from 'models/Doctor';
import type { IService } from 'models/Service';

import ServiceModel from 'models/Service';
import { ObjectID } from 'mongodb';
import { buildId } from 'utils/ids';

type ServiceInput = IService | DoctorService | AppointmentService | string | ObjectID

function getId(input: ServiceInput): string {
    if (typeof input === 'string') {
        return input;
    }
    if (input instanceof ObjectID) {
        return input.toHexString();
    }

    if ('serviceId' in input && input.serviceId != null) {
        return input.serviceId;
    }

    if (input._id != null) {
        return input._id;
    }

    throw 'Uninitialized Value!';
}

export class Service {
    __typename: 'Service'
    _input: ServiceInput
    _full: Promise<IService> | null

    constructor(input: ServiceInput) {
        this.__typename = 'Service';
        this._input = input;
        this._full = null;
    }

    id() {
        const id = getId(this._input);
        return buildId('Service', id);
    }

    async full(): Promise<IService> {
        if (typeof this._input === 'object' && 'description' in this._input) {
            return this._input;
        }

        if (this._full != null) {
            return await this._full;
        }

        const id = getId(this._input);
        const promise = ServiceModel.
            findById(id).
            then(value => {
                if (value == null) {
                    throw 'Service not found!';
                }
                return value;
            });

        this._full = promise;
        return await promise;
    }
}

export async function service(id: string | ObjectID): Promise<Service | null> {
    const value = await ServiceModel.findById(id);
    return value && new Service(value);
}
