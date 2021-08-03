import type { MutationResolvers } from '@resolvers';

import sendGridMail from '@sendgrid/mail';
import axios from 'axios';
import bcrypt from 'bcrypt';
import Appointment from 'models/Appointment';
import Checkup from 'models/Checkup';
import Doctor from 'models/Doctor';
import Followup from 'models/Followup';
import { Gender as GenderM, Insurance as InsuranceM } from 'models/Patient';
import Patient from 'models/Patient';
import Service from 'models/Service';
import User from 'models/User';
import mongoose from 'mongoose';
import RecommendationService from 'recommendations';
import { pubsub } from 'resolvers/subscription';
import { Doctor as DoctorShim } from 'shims/doctor';
import { Patient as PatientShim } from 'shims/patient';
import { patient as patientShim } from 'shims/patient';
import { user as userShim } from 'shims/user';
import { buildId, deconstructId } from 'utils/ids';
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
    async createAppointment(_, { input }, { authenticated }) {

        if(authenticated == null) {
            throw new Error('not logged in');
        }
        
        const user = await authenticated.full();
        if(user.patientRef == null) {
            throw new Error('user not patient');
        }

        const dogtorID = deconstructId(input.doctorId);
        if(dogtorID == null) {
            throw new Error('no valid doctor');
        }
        const doctor = new DoctorShim(dogtorID[1]);
        const { lastName, firstName } = await doctor.full();

        const selectedServices = input.selectedServices.compactMap(id => deconstructId(id)?.[1]);
        const services = await Service.find({ _id:{ $in:selectedServices }});

        const session = await mongoose.startSession();

        session.startTransaction();

        // Insert doctor document
        const appointmentIn = new Appointment({
            doctorRef: {
                doctorId: dogtorID[1],
                doctorName: firstName + lastName,
            },
            expectedDuration: input.expectedDuration,
            expectedTime: input.expectedTime,
            insurance: input.insurance,
            patientNotes: input.patientNotes,
            patientRef:{
                patientId: user.patientRef,
                patientName: user.firstName + user.lastName,
            },
            selectedServices: services.map(service => {
                return { serviceId:service.id, serviceName: service.name };
            }),
            sharedData: input.shareData,
        });
        await appointmentIn.save();

        await session.commitTransaction();
        session.endSession();

        // if statement should never succeed
        if (appointmentIn._id === undefined) throw 'Error';
        return appointmentIn;
    },
    async createUserDoctor(_, { input }) {
        try {
            const url = `http://open.mapquestapi.com/geocoding/v1/address?key=${process.env.GEOLOC_KEY}`;
            const res = await axios.post(url, {
                'location': `${input.address.streetNumber} ${input.address.streetName}, ${input.address.city}`,
                'options': {
                    'thumbMaps': false,
                },
            });

            const lat = res.data.results[0].locations[0].latLng.lat;
            const lon = res.data.results[0].locations[0].latLng.lng;

            const address = {
                city: input.address.city,
                location: {
                    coordinates: [
                        lon,
                        lat,
                    ],
                    type: 'Point',
                },
                streetName: input.address.streetName,
                streetNumber: input.address.streetNumber,
                zipCode: input.address.zipCode,
            };

            // Insert doctor document
            const doctorIn = new Doctor({
                address: address,
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

            try {
                await userIn.save();
            }
            catch (err) {
                await Doctor.findByIdAndDelete(doctorIn._id);
                return err;
            }

            // if statement should never succeed
            if (userIn._id === undefined) throw 'Error';
            return userShim(userIn._id);

        } catch (err) {
            return err;
        }
    },
    async createUserPatient(_, { input }) {

        try {
            const url = `http://open.mapquestapi.com/geocoding/v1/address?key=${process.env.GEOLOC_KEY}`;
            const res = await axios.post(url, {
                'location': `${input.address.streetNumber} ${input.address.streetName}, ${input.address.city}`,
                'options': {
                    'thumbMaps': false,
                },
            });

            const lat = res.data.results[0].locations[0].latLng.lat;
            const lon = res.data.results[0].locations[0].latLng.lng;

            const address = {
                city: input.address.city,
                location: {
                    coordinates: [
                        lon,
                        lat,
                    ],
                    type: 'Point',
                },
                streetName: input.address.streetName,
                streetNumber: input.address.streetNumber,
                zipCode: input.address.zipCode,
            };

            // Insert patient document
            const patientIn = new Patient({
                activityLevel: input.activityLvl,
                address: address,
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

            try {
                await userIn.save();
            }
            catch (err) {
                await Patient.findByIdAndDelete(patientIn._id);
                return err;
            }

            // if statement should never succeed
            if (userIn._id === undefined) throw 'Error';
            return userShim(userIn._id);

        } catch (err) {
            return err;
        }
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
        if (valuePatient != null) {
            await new RecommendationService().storeRemainingRecommendations(valuePatient);
        }

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
        const start = new Date();
        start.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setHours(23, 59, 59, 999);

        const allPreviousOfCurrentAppointment = await Appointment.find({
            'doctorRef.doctorId': appointment.doctorRef.doctorId,
            expectedTime: { $gte: start, $lt: new Date() },
            'patientRef.patientId': { $ne: appointment.patientRef.patientId },
        });
        const allAfterOfCurrentAppointment = await Appointment.find({
            'doctorRef.doctorId': appointment.doctorRef.doctorId,
            expectedTime: { $gt: appointment.expectedTime, $lt: end },
            'patientRef.patientId': { $ne: appointment.patientRef.patientId },
        });
        const differenceInMinutes = allPreviousOfCurrentAppointment.length > 0 ?
            allPreviousOfCurrentAppointment.map(app => {
                const diff = Math.abs(app.actualTime ? app.actualTime.valueOf() - app.expectedTime.valueOf() : 0);
                const minutes = Math.floor(diff / 1000 / 60);
                return minutes;
            }) : [0] ;

        const avgWaitingTime = differenceInMinutes.reduce((n, a) => n+a) / differenceInMinutes.length;
        const patient = await Patient.findById(appointment.patientRef.patientId);
        if (patient != null) {
            await new RecommendationService().storeRemainingRecommendations(patient);
        }

        const previousOfCurrentAppointment = await Appointment.find({
            actualTime: { $exists: true },
            'doctorRef.doctorId': appointment.doctorRef.doctorId,
            expectedTime: { $gte: start, $lt: new Date() },
            'patientRef.patientId': { $ne: appointment.patientRef.patientId },
        }).sort({ _id: -1 }).limit(1);

        let appointmentEnd = new Date();

        for (const app of allAfterOfCurrentAppointment) {
            const time = new Date(Math.max(app.expectedTime.getTime(), appointmentEnd.getTime()));
            app.estimatedTime = time;
            appointmentEnd = new Date(time.getTime()+avgWaitingTime*60*1000);
            await app.save();
            if(app._id != null) {
                pubsub.publish(`estimatedWaitingTime:${buildId('Appointment', app._id)}`,
                    { estimatedWaitingTime: app });
            }

        }

        if(previousOfCurrentAppointment.length < 1 || previousOfCurrentAppointment === undefined) {
            const diff = Math.abs(new Date().valueOf() - appointment.expectedTime.valueOf());
            const minutes = Math.floor(diff / 1000 / 60);

            const app = await Appointment.findOne({ _id: appointment._id });
            if (app != null) {
                app.actualTime = appointment.expectedTime;
                app.actualDuration = minutes;
                await app.save();
                pubsub.publish('appointmentFinished', { appointmentFinished: avgWaitingTime });
                return true;
            }
            return false;
        }
        const actualTimeOf = previousOfCurrentAppointment[0].actualTime || new Date();
        const actualDurationOf = previousOfCurrentAppointment[0].actualDuration || 0;

        const endOfPrevAppointment = new Date(actualTimeOf.setTime(actualTimeOf.getTime() + actualDurationOf*60000));

        const diff = Math.abs(new Date().valueOf() - endOfPrevAppointment.valueOf());
        const minutes = Math.floor(diff / 1000 / 60);

        const actualTimeToBeSet = endOfPrevAppointment > appointment.expectedTime ? endOfPrevAppointment
            : appointment.expectedTime;

        const actualDurationToBeSet = minutes;

        const app = await Appointment.findOne({ _id: appointment._id });
        if (app != null) {
            app.actualTime = actualTimeToBeSet;
            app.actualDuration = actualDurationToBeSet;
            await app.save();
            return true;
        }

        return false;

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
    async markFollowupAsRead(_, { id }) {
        const deconstructed = deconstructId(id);
        
        const nodeType = deconstructed?.[0];
        const followupId = deconstructed?.[1];

        if (nodeType !== 'Followup')
        {
            return false;
        }

        await Followup.updateOne({ _id: followupId }, { isRead: true });

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
            await new RecommendationService().storeRemainingRecommendations(patientUpd);
            if (patientUpd._id !== undefined) return patientShim(patientUpd._id);
        }

        throw 'Error';
    },
};

export default Mutation;
