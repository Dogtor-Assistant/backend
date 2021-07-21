import type { MutationResolvers } from '@resolvers';

import sendGridMail from '@sendgrid/mail';
import bcrypt from 'bcrypt';
import Appointment from 'models/Appointment';
import Doctor from 'models/Doctor';
import Followup from 'models/Followup';
import Patient from 'models/Patient';
import User from 'models/User';
import mongoose from 'mongoose';
import { Doctor as DoctorShim } from 'shims/doctor';
import { Patient as PatientShim } from 'shims/patient';
import { user as userShim } from 'shims/user';
import { deconstructId } from 'utils/ids';

const Mutation: MutationResolvers = {
    async assignFollowup(_, { followupInput }) {

        const deconstructedDoctorId = deconstructId(followupInput.doctorRef);
        const doctorId = deconstructedDoctorId?.[1];

        const deconstructedPatientId = deconstructId(followupInput.patientRef);
        const patientId = deconstructedPatientId?.[1];

        const valuePatient = await Patient.findById(patientId);
        const patient = valuePatient && new PatientShim(valuePatient);
        const patientUser = await patient?.user();

        const valueDoctor = await Doctor.findById(doctorId);
        const doctor = valueDoctor && new DoctorShim(valueDoctor);
        const doctorUser = await doctor?.user();

        const followup = new Followup({
            doctorNotes: followupInput.doctorNotes,
            doctorRef: {
                doctorId: valueDoctor?._id,
                doctorName: doctorUser?.firstName,
            },
            patientRef:{
                patientAddress: valuePatient?.address,
                patientId: valuePatient?._id,
                patientInsurance: valuePatient?.insurance,
                patientName: patientUser?.firstName,
            },
            services: followupInput.services.map(service => {
                const deconstructedSerivceId = deconstructId(service.serviceId);
                const serviceId = deconstructedSerivceId?.[1];
                return ({
                    serviceId: serviceId,
                    serviceName: service.serviceName,
                });
            }),
            suggestedDate: followupInput.suggestedDate,
        });

        try {
            await followup.save();

            const apiKey:string = process.env.SENDGRID_API_KEY || '';
            sendGridMail.setApiKey(apiKey);
            const msg = {

                from: 'pellumb.baboci@tum.de',
                html: `<strong>This is an automatic message</strong> 
                    
            <p> You have new FollowUp on date ${followupInput.suggestedDate.toLocaleDateString()}</p>
            <p> Please go and check from you account https://dogtor.xyz/login</p>
            `,
                subject: 'Assigned new FollowUp ',
                to: patientUser?.email,
            };
            sendGridMail.send(msg);

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
            firstName: input.firstName,
            lastName: input.lastName,
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

        const valuePatient = await Patient.findById(appointment.patientRef.patientId);
        const patient = valuePatient && new PatientShim(valuePatient);
        const patientUser = await patient?.user();

        const apiKey:string = process.env.SENDGRID_API_KEY || '';
        sendGridMail.setApiKey(apiKey);
        const msg = {

            from: 'pellumb.baboci@tum.de',
            html: `<strong>This is an automatic message</strong> 
                    
            <p> Your appointment has been canceled </p>`,
            subject: 'Appointment Deletion',
            to: patientUser?.email,
        };
        sendGridMail.send(msg);

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
