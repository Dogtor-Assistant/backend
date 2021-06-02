import mongoose from 'mongoose';

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

const patientSchema = new mongoose.Schema({
    activityLevel: {
        type: Number,
    },
    address: {
        required: true,
        type: addressSchema,
    },
    allergies: {
        type: [String],
    },
    birthDate: {
        type: Date,
    },
    gender: {
        type: String,
    },
    height: {
        type: Number,
    },
    insurance: {
        required: true,
        type: String,
    },
    lastUpdate: {
        type: Date,
    },
    medicalConditions: {
        type: [String],
    },
    medications: {
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
        type: [String],
    },
    weight: {
        type: Number,
    },
});

const Patient = mongoose.model('patient', patientSchema);
module.exports = Patient;
