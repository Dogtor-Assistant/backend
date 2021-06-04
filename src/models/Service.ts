import { IDoctor } from './Doctor';

import { Document, Model, model, Schema } from 'mongoose';

const ServiceSchema: Schema = new Schema({
    description: {
        type: String,
    },
    doctorRef: {
        ref: 'Doctor',
        required: true,
        type: Schema.Types.ObjectId,
    },
    estimatedDuration: {
        required: true,
        type: Number,
    },
    name: {
        required: true,
        type: String,
    },
    privateCovered: {
        required: true,
        type: Boolean,
    },
    publicCovered: {
        required: true,
        type: Boolean,
    },
    timesSelected: {
        default: 0,
        type: Number,
    },
}, {
    timestamps: true,
});

export interface IService extends Document {
    name: string,
    description: string,
    estimatedDuration: number,
    publicCovered: boolean,
    privateCovered: boolean,
    timesSelected?: number,
    doctorRef: IDoctor['_id']
}

const Service: Model<IService> = model('Service', ServiceSchema);

export default Service;
