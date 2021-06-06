import type { IDoctor } from './Doctor';
import type { IPatient } from './Patient';
import type { IService } from './Service';
import type { Document, Model } from 'mongoose';

import { model, Schema } from 'mongoose';

const MiniPatientSchema: Schema = new Schema({
    patientId: {
        ref: 'Patient',
        required: true,
        type: Schema.Types.ObjectId,
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

const AppointmentSchema: Schema = new Schema({
    __typename: {
        default: 'Appointment',
        type: String,
    },
    actualDuration: {
        type: Number,
    },
    actualTime: {
        type: Date,
    },
    doctorRef: {
        required: true,
        type: MiniDoctorSchema,
    },
    expectedDuration: {
        required: true,
        type: Number,
    },
    expectedTime: {
        required: true,
        type: Date,
    },
    insurance: {
        enum: [0, 1],
        required: true,
        type: Number,
    },
    patientNotes: {
        type: String,
    },
    patientRef: {
        required: true,
        type: MiniPatientSchema,
    },
    selectedServices: {
        required: true,
        type: [MiniServiceSchema],
    },
    sharedData: {
        required: true,
        type: Boolean,
    },
}, {
    timestamps: true,
});

export enum Insurance {
    PRIVATE = 1,
    PUBLIC = 0
}

export interface IAppointment extends Document<string> {
    __typename: 'Appointment',
    patientRef: IMiniPatient,
    doctorRef: IMiniDoctor,
    expectedTime: Date,
    actualTime?: Date,
    expectedDuration: number,
    actualDuration?: number,
    insurance: Insurance,
    selectedServices: Array<IMiniService>,
    patientNotes?: string,
    sharedData: boolean,
}

const Appointment: Model<IAppointment> = model('Appointment', AppointmentSchema);

export default Appointment;
