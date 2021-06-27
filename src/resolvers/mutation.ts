import type { MutationResolvers } from '@resolvers';

import bcrypt from 'bcrypt';
import Doctor from 'models/Doctor';
import Patient from 'models/Patient';
import User from 'models/User';
import mongoose from 'mongoose';
import { user as userShim } from 'shims/user';

const Mutation: MutationResolvers = {
    async createUserDoctor(_, { input }) {
        
        const session = await mongoose.startSession();

        session.startTransaction();

        // Insert doctor document
        const doctorIn = new Doctor({
            address: input.address,
            offeredSlots: input.offeredSlots,
            phoneNumber: input.phoneNumber,
            specialities: input.specialities,
            webpage: input.webpage,
        });
        await doctorIn.save();

        // Insert user document
        const salt = await bcrypt.genSalt();
        const userIn = new User({
            doctorRef: doctorIn._id,
            email: input.email,
            firstName: input.firstName,
            lastName: input.lastName,
            password: await bcrypt.hash(input.password, salt),
        });
        await userIn.save();
        
        await session.commitTransaction();
        session.endSession();

        // if statement should never succeed
        if (userIn._id === undefined) throw 'Error';
        return userShim(userIn._id);
    },
    async createUserPatient(_, { input }) {
        const session = await mongoose.startSession();

        session.startTransaction();

        // Insert patient document
        const patientIn = new Patient({
            activityLevel: input.activityLvl,
            address: input.address,
            allergies: input.allergies,
            birthDate: input.birthDate,
            gender: input.gender,
            height: input.height,
            insurance: input.insurance,
            medicalConditions: input.medConditions,
            medications: input.medications,
            phoneNumber: input.phoneNumber,
            smoker: input.smoker,
            surgeries: input.surgeries,
            weight: input.weight,
        });
        await patientIn.save();

        // Insert user document
        const salt = await bcrypt.genSalt();
        const userIn = new User({
            email: input.email,
            firstName: input.firstName,
            lastName: input.lastName,
            password: await bcrypt.hash(input.password, salt),
            patientRef: patientIn._id,
        });
        await userIn.save();
        
        await session.commitTransaction();
        session.endSession();

        // if statement should never succeed
        if (userIn._id === undefined) throw 'Error';
        return userShim(userIn._id);
    },
};

export default Mutation;
