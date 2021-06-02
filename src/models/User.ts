import mongoose from 'mongoose';
import ObjectId from 'mongoose';

const userSchema = new mongoose.Schema({
    doctorRef: {
        type: ObjectId,
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
        type: ObjectId,
    },
});

const User = mongoose.model('user', userSchema);
module.exports = User;
