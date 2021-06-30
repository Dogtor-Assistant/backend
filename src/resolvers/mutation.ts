import type { MutationResolvers } from '@resolvers';

import bcrypt from 'bcrypt';
import Appointment from 'models/Appointment';
import Doctor from 'models/Doctor';
import Followup from 'models/Followup';
import Patient from 'models/Patient';
import User from 'models/User';
import mongoose from 'mongoose';
import { user as userShim } from 'shims/user';
import { deconstructId } from 'utils/ids';

const Mutation: MutationResolvers = {
    async assignFollowup(_, { followupInput }, { authenticated }) {

        const user = await authenticated?.full();
    
        //TODO: Check again the patient ref not sure how to get from input**
        const followup = new Followup({
            doctorNotes: followupInput.doctorNotes,
            doctorRef: user?.doctorRef,
            //patientRef: ,
            services: followupInput.services,
            suggestedDate: followupInput.suggestedDate,
        });

        try {
            await followup.save();
            return true;
        } catch (error) {
            return false;
        }

    },
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
    async deleteAppointmentById(_, { id }) {

        const deconstructed = deconstructId(id);
        const appointmentId = deconstructed?.[1];

        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            return false;
        }

        await Appointment.deleteOne({ _id: appointment._id });

        return true;

    },
    async makeAppointmentAsDone(_, { id }) {

        const deconstructed = deconstructId(id);
        const appointmentId = deconstructed?.[1];

        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            return false;
        }

        await Appointment.updateOne({ _id: appointment._id }, { actualTime: new Date() });

        return true;

    },
};

export default Mutation;
