import type { IDoctor } from './Doctor';
import type { IPatient } from './Patient';
import type { Document, Model } from 'mongoose';

import { model, Schema } from 'mongoose';

const UserSchema: Schema = new Schema({
    doctorRef: {
        ref: 'Doctor',
        type: Schema.Types.ObjectId,
    },
    email: {
        required: true,
        type: String,
        unique: true,
    },
    firstName: {
        required: true,
        type: String,
    },
    lastName: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    patientRef: {
        ref: 'Patient',
        type: Schema.Types.ObjectId,
    },
}, {
    timestamps: true,
});

UserSchema.index({ lastName: 1 }, { partialFilterExpression: { doctorRef: { $exists: true }}});

export interface IUser extends Document<string> {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    patientRef?: IPatient['_id'],
    doctorRef?: IDoctor['_id'],
}

const User: Model<IUser> = model('User', UserSchema);

export default User;
