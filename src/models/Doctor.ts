import mongoose from 'mongoose';
import ObjectId from 'mongoose';

const addressSchema = new mongoose.Schema({
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
});

const miniServiceSchema = new mongoose.Schema({
    serviceId: {
        required: true,
        type: ObjectId,
    },
    serviceName: {
        required: true,
        type: String,
    },
});

const miniReviewSchema = new mongoose.Schema({
    reviewContent: {
        required: true,
        type: String,
    },
    reviewId: {
        required: true,
        type: ObjectId,
    },
    reviewRating: {
        required: true,
        type: Number,
    },
});

const slotSchema = new mongoose.Schema({
    day: {
        required: true,
        type: String,
    },
    slotStart: {
        required: true,
        type: String,
    },
    slotStop: {
        required: true,
        type: String,
    },
});

const doctorSchema = new mongoose.Schema({
    address: {
        required: true,
        type: addressSchema,
    },
    offeredSlots: {
        default: {},
        type: [slotSchema],
    },
    phoneNumber: {
        required: true,
        type: String,
        unique: true,
    },
    specialities: {
        type: [String],
    },
    starRating: {
        type: Number,
    },
    topReviews: {
        type: [miniReviewSchema],
    },
    topServices: {
        type: [miniServiceSchema],
    },
    webpage: {
        type: String,
    },
});

const Doctor = mongoose.model('doctor', doctorSchema);
module.exports = Doctor;
