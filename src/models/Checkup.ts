import type { IPatient } from './Patient';
import type { Document, Model } from 'mongoose';

import { model, Schema } from 'mongoose';

const AddressSchema: Schema = new Schema({
    city: {
        required: true,
        type: String,
    },
    streetName: {
        required: true,
        type: String,
    },
    streetNumber: {
        required: true,
        type: Number,
    },
    zipCode: {
        required: true,
        type: Number,
    },
}, {
    _id: false,
});

const MiniPatientSchema: Schema = new Schema({
    patientAddress: {
        required: true,
        type: AddressSchema,
    },
    patientId: {
        ref: 'Patient',
        required: true,
        type: Schema.Types.ObjectId,
    },
    patientInsurance: {
        enum: [0, 1],
        required: true,
        type: Number,
    },
    patientName: {
        required: true,
        type: String,
    },
}, {
    _id: false,
});

export interface IMiniPatient extends Document {
    patientId: IPatient['_id'],
    patientName: string,
    patientInsurance: IPatient['insurance'],
    patientAddress: IPatient['address'],
}

const CheckupSchema: Schema = new Schema({
    __typename: {
        default: 'Checkup',
        type: String,
    },
    isRead: {
        default: false,
        type: Boolean,
    },
    patientRef: {
        required: true,
        type: MiniPatientSchema,
    },
    services: {
        required: true,
        type: [String],
    },
    suggestedDate: {
        required: true,
        type: Date,
    },
}, {
    timestamps: true,
});

export interface ICheckup extends Document<string> {
    __typename: 'Checkup',
    patientRef: IMiniPatient,
    services: Array<string>,
    suggestedDate: Date,
    isRead: boolean,
}

const Checkup: Model<ICheckup> = model('Checkup', CheckupSchema);

export default Checkup;
