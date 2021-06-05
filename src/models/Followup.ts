import type { IDoctor } from './Doctor';
import type { IPatient } from './Patient';
import type { IService } from './Service';
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

interface IMiniPatient extends Document {
    patientId: IPatient['_id'],
    patientName: string,
    patientInsurance: IPatient['insurance'],
    patientAddress: IPatient['address'],
}

const MiniDoctorSchema: Schema = new Schema({
    doctorId: {
        ref: 'Doctor',
        required: true,
        type: Schema.Types.ObjectId,
    },
    doctorName: {
        required: true,
        type: String,
    },
}, {
    _id: false,
});

interface IMiniDoctor extends Document {
    doctorId: IDoctor['_id'],
    doctorName: string,
}

const MiniServiceSchema: Schema = new Schema({
    serviceId: {
        ref: 'Service',
        required: true,
        type: Schema.Types.ObjectId,
    },
    serviceName: {
        required: true,
        type: String,
    },
}, {
    _id: false,
});

interface IMiniService extends Document {
    serviceId: IService['_id'],
    serviceName: IService['name'],
}

const FollowupSchema: Schema = new Schema({
    doctorNotes: {
        type: String,
    },
    doctorRef: {
        required: true,
        type: MiniDoctorSchema,
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
        type: [MiniServiceSchema],
    },
    suggestedDate: {
        required: true,
        type: Date,
    },
}, {
    timestamps: true,
});

export interface IFollowup extends Document {
    patientRef: IMiniPatient,
    doctorRef: IMiniDoctor,
    services: Array<IMiniService>,
    suggestedDate: Date,
    doctorNotes?: string,
    isRead: boolean,
}

const Followup: Model<IFollowup> = model('Followup', FollowupSchema);

export default Followup;
