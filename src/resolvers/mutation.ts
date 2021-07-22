import type { MutationResolvers } from '@resolvers';

import sendGridMail from '@sendgrid/mail';
import bcrypt from 'bcrypt';
import Appointment from 'models/Appointment';
import Checkup from 'models/Checkup';
import Doctor from 'models/Doctor';
import Followup from 'models/Followup';
import { Gender as GenderM, Insurance as InsuranceM } from 'models/Patient';
import Patient from 'models/Patient';
import User from 'models/User';
import mongoose from 'mongoose';
import { Doctor as DoctorShim } from 'shims/doctor';
import { Patient as PatientShim } from 'shims/patient';
import { patient as patientShim } from 'shims/patient';
import { user as userShim } from 'shims/user';
import { deconstructId } from 'utils/ids';
import { Insurance } from 'utils/resolvers';

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
    async generateCheckups(_, { input }) {
        const deconstructedPatientId = deconstructId(input.id);
        const patientId = deconstructedPatientId?.[1];

        const patient = await Patient.findById(patientId);
        
        if (patient != null) {
            const { _id, address, insurance } = patient;
            const recommendations = input.recommendations;

            const user = await User.findOne({ patientRef: _id });
            if (user == null) return [];
            const { firstName, lastName } = user;

            const oldCheckups = await Checkup.find({ 'patientRef.patientId': _id });

            const newRec = recommendations.filter(rec => {

                //One time recommendation
                if (rec.kind === 'single') {
                    let makeRecommendation = true;
                    oldCheckups.forEach(oldCheckup => {
                        if (oldCheckup.services[0] === rec.service.toString()) {
                            makeRecommendation = false;
                        }
                    });
                    return makeRecommendation;
                }

                //Periodic recommendation
                if (rec.kind === 'periodic') {
                    let makeRecommendation = true;
                    oldCheckups.forEach(oldCheckup => {
                        const periodInDays = rec.periodInDays == null ? 0 : rec.periodInDays;
                        const lim = new Date();
                        lim.setDate(oldCheckup.suggestedDate.getDate() + periodInDays - 14);
                        
                        if (oldCheckup.services[0] === rec.service.toString() &&
                            new Date() < lim) {
                            makeRecommendation = false;
                        }
                            
                    });
                    return makeRecommendation;
                }
            });

            // Insert recommendations as checkups in DB
            const suggestedDate = new Date();
            suggestedDate.setDate(suggestedDate.getDate() + 14);

            const newCheckups = newRec.map(rec => {
                return new Checkup({
                    'isRead': false,
                    'patientRef': {
                        'patientAddress': address,
                        'patientId': _id,
                        'patientInsurance': insurance,
                        'patientName': `${firstName} ${lastName}`,
                    },
                    'services' : [rec.service.toString()],
                    'suggestedDate' : suggestedDate,
                });
            });

            const insertedCheckups = await Checkup.insertMany(newCheckups);

            if (insertedCheckups.length > 0) {
                // TODO: send email notification
                return insertedCheckups;
            }
            return [];
        }
        
        return [];
    },
    async makeAppointmentAsDone(_, { id }) {

        const deconstructed = deconstructId(id);
        const appointmentId = deconstructed?.[1];

        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            return false;
        }
        
        const start = new Date();
        start.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setHours(23, 59, 59, 999);

        const previousOfCurrentAppointment = await Appointment.find({
            'doctorRef.doctorId': appointment.doctorRef.doctorId,
            expectedTime: { $gte: start, $lt: end },
            'patientRef.patientId': { $ne: appointment.patientRef.patientId },
        }).sort({ _id: -1 }).limit(1);

        const actualTimeOf = previousOfCurrentAppointment[0].actualTime || new Date();
        const actualDurationOf = previousOfCurrentAppointment[0].actualDuration || 0;

        const endOfPrevAppointment = new Date(actualTimeOf.setTime(actualTimeOf.getTime() + actualDurationOf*60000));

        const diff = Math.abs(new Date().valueOf() - endOfPrevAppointment.valueOf());
        const minutes = Math.floor(diff / 1000 / 60);

        const actualDurationToBeSet = minutes;

        await Appointment.updateOne({ _id: appointment._id }, {
            actualDuration: actualDurationToBeSet,
            actualTime: endOfPrevAppointment,
        });

        return true;

    },
    async markCheckupAsRead(_, { id }) {
        const deconstructed = deconstructId(id);
        
        const nodeType = deconstructed?.[0];
        const checkupId = deconstructed?.[1];

        if (nodeType !== 'Checkup')
        {
            return false;
        }

        await Checkup.updateOne({ _id: checkupId }, { isRead: true });

        return true;
    },
    async updateUserPatientProfile(_, { input }) {
        const deconstructedPatientId = deconstructId(input.id);
        const patientId = deconstructedPatientId?.[1];

        const patientUpd = await Patient.findOne({ _id: patientId });
        
        let gender = GenderM.MALE;
        if (input.gender as unknown as number === 0) gender = GenderM.FEMALE;
        else if (input.gender as unknown as number === 1) gender = GenderM.MALE;
        else if (input.gender as unknown as number === 2) gender = GenderM.TRANSGENDER_FEMALE;
        else if (input.gender as unknown as number === 3) gender = GenderM.TRANSGENDER_MALE;
        else if (input.gender as unknown as number === 4) gender = GenderM.NON_BINARY;
        else gender = GenderM.FEMALE;

        if (patientUpd != null) {
            patientUpd.birthDate = input.birthDate;
            patientUpd.gender = gender;
            patientUpd.insurance = input.insurance === Insurance.Public ? InsuranceM.PUBLIC : InsuranceM. PRIVATE;

            await patientUpd.save();
            if (patientUpd._id !== undefined) return patientShim(patientUpd._id);
        }

        throw 'Error';
    },
};

export default Mutation;
