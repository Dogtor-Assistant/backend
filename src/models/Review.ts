import { IDoctor } from './Doctor';
import { IPatient } from './Patient';

import { Document, Model, model, Schema } from 'mongoose';

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

const ReviewSchema: Schema = new Schema({
    content: {
        type: String,
    },
    doctorRef: {
        ref: 'Doctor',
        required: true,
        type: Schema.Types.ObjectId,
    },
    patientRef: {
        required: true,
        type: MiniPatientSchema,
    },
    rating: {
        enum: [0, 1, 2, 3, 4, 5],
        required: true,
        type: Number,
    },
}, {
    timestamps: true,
});

enum Rating {
    ZERO_STAR = 0,
    ONE_STAR = 1,
    TWO_STAR = 2,
    THREE_STAR = 3,
    FOUR_STAR = 4,
    FIVE_STAR = 5
}

export interface IReview extends Document {
    patientRef: IMiniPatient,
    doctorRef: IDoctor['_id'],
    rating: Rating,
    content?: string,
}

const Review: Model<IReview> = model('Review', ReviewSchema);

export default Review;
