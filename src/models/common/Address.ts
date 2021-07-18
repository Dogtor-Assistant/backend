
import type { Document } from 'mongoose';

import { Schema } from 'mongoose';

export const AddressSchema: Schema = new Schema({
    city: {
        required: true,
        type: String,
    },
    location: {
        coordinates: {
            required: true,
            type: [Number],
        },
        type: {
            enum: ['Point'],
            required: true,
            type: String,
        },
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

AddressSchema.index({ location: '2dsphere' });

export interface IAddress extends Document {
    city: string,
    location: { coordinates: [number, number], type: 'Point' },
    streetName: string,
    streetNumber: number,
    zipCode: number,
}
