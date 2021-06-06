import type { IReview } from './Review';
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

interface IAddress extends Document {
    city: string,
    streetName: string,
    streetNumber: number,
    zipCode: number,
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

const MiniReviewSchema: Schema = new Schema({
    reviewContent: {
        required: true,
        type: String,
    },
    reviewId: {
        ref: 'Review',
        required: true,
        type: Schema.Types.ObjectId,
    },
    reviewRating: {
        enum: [0, 1, 2, 3, 4, 5],
        required: true,
        type: Number,
    },
}, {
    _id: false,
});

interface IMiniReview extends Document {
    reviewContent: IReview['content'],
    reviewId: IReview['_id'],
    reviewRating: IReview['rating'],
}

const SlotSchema: Schema = new Schema({
    day: {
        enum: [0, 1, 2, 3, 4, 5, 6],
        required: true,
        type: Number,
    },
    slotStart: {
        required: true,
        type: String,
    },
    slotStop: {
        required: true,
        type: String,
    },
}, {
    _id: false,
});

interface ISlot extends Document {
    day: Day,
    slotStart: string,
    slotStop: string,
}

export enum Day {
    MONDAY = 0,
    TUESDAY = 1,
    WEDNESDAY = 2,
    THURSDAY = 3,
    FRIDAY = 4,
    SATURDAY = 5,
    SUNDAY = 6
}

const DoctorSchema: Schema = new Schema({
    __typename: {
        default: 'Doctor',
        type: String,
    },
    address: {
        required: true,
        type: AddressSchema,
    },
    offeredSlots: {
        default: [],
        type: [SlotSchema],
    },
    phoneNumber: {
        required: true,
        type: String,
        unique: true,
    },
    specialities: {
        required: true,
        type: [String],
    },
    starRating: {
        default: 0,
        type: Number,
    },
    topReviews: {
        default: [],
        type: [MiniReviewSchema],
    },
    topServices: {
        default: [],
        type: [MiniServiceSchema],
    },
    webpage: {
        type: String,
    },
}, {
    timestamps: true,
});

export interface IDoctor extends Document<string> {
    __typename: 'Doctor',
    address: IAddress,
    phoneNumber: string,
    webpage?: string,
    specialities: Array<string>,
    topServices?: Array<IMiniService>,
    topReviews?: Array<IMiniReview>,
    starRating?: number,
    offeredSlots?: Array<ISlot>,
}

const Doctor: Model<IDoctor> = model('Doctor', DoctorSchema);

export default Doctor;
