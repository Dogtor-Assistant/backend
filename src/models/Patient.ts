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

interface IAddress extends Document {
    city: string,
    streetName: string,
    streetNumber: number,
    zipCode: number,
}

const PatientSchema: Schema = new Schema({
    activityLevel: {
        enum: [0, 1, 2, 3, 4],
        type: Number,
    },
    address: {
        required: true,
        type: AddressSchema,
    },
    allergies: {
        default: [],
        type: [String],
    },
    birthDate: {
        type: Date,
    },
    gender: {
        enum: [0, 1],
        type: Number,
    },
    height: {
        type: Number,
    },
    insurance: {
        enum: [0, 1],
        required: true,
        type: Number,
    },
    medicalConditions: {
        default: [],
        type: [String],
    },
    medications: {
        default: [],
        type: [String],
    },
    phoneNumber: {
        required: true,
        type: String,
        unique: true,
    },
    smoker: {
        type: Boolean,
    },
    surgeries: {
        default: [],
        type: [String],
    },
    weight: {
        type: Number,
    },
}, {
    timestamps: true,
});

enum ActivityLevel {
    VERY_HIGH = 4,
    HIGH = 3,
    MEDIUM = 2,
    LOW = 1,
    VERY_LOW = 0
}

export enum Gender {
    MALE = 1,
    FEMALE = 0
}

enum Insurance {
    PRIVATE = 1,
    PUBLIC = 0
}

export interface IPatient extends Document {
    address: IAddress,
    phoneNumber: string,
    insurance: Insurance,
    birthDate?: Date,
    gender?: Gender,
    height?: number,
    weight?: number,
    activityLevel?: ActivityLevel,
    medicalConditions?: Array<string>,
    allergies?: Array<string>,
    medications?: Array<string>,
    surgeries?: Array<string>,
    smoker?: boolean,
}

const Patient: Model<IPatient> = model('Patient', PatientSchema);

export default Patient;
