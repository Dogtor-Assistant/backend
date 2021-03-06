import type { IAddress } from './common/Address';
import type { IReview } from './Review';
import type { IService } from './Service';
import type { Document, Model } from 'mongoose';

import { AddressSchema } from './common/Address';

import { model, Schema } from 'mongoose';

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

export interface IMiniService extends Document {
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

export interface IMiniReview extends Document {
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
    address: {
        required: true,
        type: AddressSchema,
    },
    firstName: {
        required: true,
        type: String,
    },
    lastName: {
        required: true,
        type: String,
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

DoctorSchema.index(
    {
        'address.city': 'text',
        'address.streetName': 'text',
        'firstName': 'text',
        'lastName': 'text',
        'specialities': 'text',
        'topServices.serviceName': 'text',
        'webpage': 'text',
    },
    {
        weights: {
            'address.city': 2,
            'address.streetName': 3,
            'specialities': 4,
            'topServices.serviceName': 5,
            'webpage': 1,
        },
    },
);

export interface IDoctor extends Document<string> {
    address: IAddress,
    firstName: string,
    lastName: string,
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
