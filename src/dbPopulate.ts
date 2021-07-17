import type { IAppointment } from './models/Appointment';
import type { ICheckup } from './models/Checkup';
import type { IDoctor, IMiniReview, IMiniService } from './models/Doctor';
import type { IFollowup } from './models/Followup';
import type { IPatient } from './models/Patient';
import type { IReview } from './models/Review';
import type { IService } from './models/Service';
import type { IUser } from './models/User';
import type { Document, Model } from 'mongoose';

import Appointment from './models/Appointment';
import Checkup from './models/Checkup';
import { Day } from './models/Doctor';
import Doctor from './models/Doctor';
import Followup from './models/Followup';
import { Gender, Insurance } from './models/Patient';
import Patient from './models/Patient';
import Review from './models/Review';
import Service from './models/Service';
import User from './models/User';

import bcrypt from 'bcrypt';
import fs from 'fs';
import mongoose from 'mongoose';

/*-----------------------------------------------*/
// MongoDB Connection
const db = mongoose.connection;

// Address constants
const cities = ['Munich', 'Berlin', 'Hamburg', 'Stuttgart', 'Cologne', 'Frankfurt'];
const streets = ['Kaufingerstraße', 'Friedrichstraße', 'Poststraße', 'Königstraße', 'Schildergasse', 'Zeil'];
const zips = [80331, 10117, 20354, 70173, 50667, 60547];
const lat = [48.137154, 52.520008, 53.551086, 48.783333, 50.935173, 50.110924];
const lon = [11.576124, 13.404954, 9.993682, 9.183333, 6.953101, 8.682127];

/*-----------------------------------------------*/
function readNames() {
    const content = fs.readFileSync('/home/konpap99/seba/backend/src/names.txt', 'utf8');
    const lines = content.toString().split('\n');
    return lines.map(function(line) {
        const firstName = line.split(' ')[0];
        const lastName = line.split(' ')[1];
        return { 'firstName': firstName, 'lastName': lastName };
    });
}

function dropCollections() {
    db.dropCollection('patients');
    db.dropCollection('doctors');
    db.dropCollection('users');
    db.dropCollection('reviews');
    db.dropCollection('services');
    db.dropCollection('appointments');
    db.dropCollection('checkups');
    db.dropCollection('followups');
}

async function createPatients(): Promise<IPatient[]> {
    let i = 0;

    const allergies = ['Tree Nuts', 'Soy', 'Shrimps', 'Peanuts', 'Eggs', 'Wheat', 'Diary'];
    const medCond = ['Asthma', 'Depression', 'Diabetes', 'Back pain', 'Hypothyroidism',
        'Joint pain', 'Anxiety', 'Sleep deprivation', 'Hypertension', 'Scoliosis'];
    const meds = ['Metformin', 'Amlodipine', 'Metoprolol', 'Omeprazole', 'Simvastatin',
        'Losartan', 'Albuterol', 'Lisinopril', 'Atorvastatin', 'Levothyroxine'];
    const surgs = ['Appendectomy', 'Cataract', 'C-Section', 'Tonsillectomy', 'Carotid endarterectomy',
        'Heart bypass', 'Arthroscopy', 'Facelift', 'Gastroscopy', 'Thyroidectomy'];

    const patientsArray: Array<IPatient> = [];
    for (i = 0; i < 100; i++) {
        const randomIndex = Math.floor(Math.random() * 6);
        const startDate = new Date(1980, 1, 1);
        const endDate = new Date(1980, 1, 1);
        const slicer = Math.floor(Math.random() * 7) + 2;
        const num = Math.floor(Math.random() * 90000000) + 10000000;

        patientsArray.push(new Patient({
            activityLevel: Math.floor(Math.random() * 5),
            address: {
                city: cities[randomIndex],
                location: {
                    coordinates: [
                        lat[randomIndex] + (Math.random() / 1000000),
                        lon[randomIndex] + (Math.random() / 1000000)],
                    type: 'Point',
                },
                streetName: streets[randomIndex],
                streetNumber: Math.floor(Math.random() * 200) + 1,
                zipCode: zips[randomIndex],
            },
            allergies: allergies[Math.floor(Math.random() * allergies.length)],
            birthDate: new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())),
            gender: i < 50 ? Gender.MALE : Gender.FEMALE,
            height: Math.floor(Math.random() * 46) + 165,
            insurance: Math.random() < 0.5 ? Insurance.PRIVATE : Insurance.PUBLIC,
            medicalConditions: medCond.slice(slicer, slicer + 3),
            medications: meds.slice(slicer - 1, slicer + 2),
            phoneNumber: `170${num.toString()}`,
            smoker: Math.random() < 0.7 ? false : true,
            surgeries: surgs.slice(slicer - 2, slicer),
            weight: Math.floor(Math.random() * 46) + 65,
        }));
    }
    return await Patient.insertMany(patientsArray);
}

async function createDoctors(names: any[]): Promise<IDoctor[]> {
    let i = 0;

    const specialties = ['General Practicioner', 'Dentist', 'Dermatologist', 'Neurologist', 'Opthalmologist',
        'Surgeon', 'Urologist', 'Pediatrician', 'Pathologist', 'Psychiatrist'];
    const slots = [{ day: Day.MONDAY, slotStart: '9:00', slotStop: '14:00' },
        { day: Day.TUESDAY, slotStart: '8:30', slotStop: '12:00' },
        { day: Day.WEDNESDAY, slotStart: '10:00', slotStop: '19:00' },
        { day: Day.THURSDAY, slotStart: '9:30', slotStop: '17:00' },
        { day: Day.FRIDAY, slotStart: '8:00', slotStop: '16:00' }];
    
    const doctorsArray: Array<IDoctor> = [];
    for(i = 0; i < 40; i++) {
        const randomIndex = Math.floor(Math.random() * 6);
        const slicer = Math.floor(Math.random() * 2) + 2;
        const num = Math.floor(Math.random() * 90000000) + 10000000;

        doctorsArray.push(new Doctor({
            address: {
                city: cities[randomIndex],
                location: {
                    coordinates: [
                        lat[randomIndex] + (Math.random() / 1000000),
                        lon[randomIndex] + (Math.random() / 1000000)],
                    type: 'Point',
                },
                streetName: streets[randomIndex],
                streetNumber: Math.floor(Math.random() * 200) + 1,
                zipCode: zips[randomIndex],
            },
            firstName: names[i+86].firstName,
            lastName: names[i+86].lastName,
            offeredSlots: slots.slice(slicer, slicer + 3),
            phoneNumber: `170${num.toString()}`,
            specialities: specialties[Math.floor(Math.random() * specialties.length)],
            starRating: 0,
            topReviews: [],
            topServices: [],
        }));
    }
    return await Doctor.insertMany(doctorsArray);
}

async function createUsers(patientsId: any[], doctorsId: any[], names: any[]): Promise<IUser[]> {
    let i = 0;

    const usersArray: Array<IUser> = [];
    for(i = 0; i < 125; i++) {
        const salt = await bcrypt.genSalt();

        usersArray.push(new User({
            doctorRef: i < 85 ? null : mongoose.Types.ObjectId(doctorsId[i-85].toString()),
            email: `user${i}@dogtor.com`,
            firstName: names[i].firstName,
            lastName: names[i].lastName,
            password: await bcrypt.hash(`passw${i}`, salt),
            patientRef: i < 100 ? new mongoose.Types.ObjectId(patientsId[i].toString()) : null,
        }));
    }
    return await User.insertMany(usersArray);
}

async function createReviews(patientsId: any[], doctorsId: any[], names: any[]): Promise<IReview[]> {
    let i = 0;

    const contents = ['Worst doctor in town!', 'Huge waiting lines!', 'Just another typical doctor!',
        'Although good, the doctor was impolite!', 'Professional doc with short waiting time!', 'Best Doctor in town!'];

    const reviewsArray: Array<IReview> = [];
    for (i = 0; i < 50; i++) {
        const randomIndex = Math.floor(Math.random() * 6);
        const docId = doctorsId[Math.floor(Math.random() * doctorsId.length)];
        const patInd = Math.floor(Math.random() * patientsId.length);
        const patId = patientsId[patInd];

        reviewsArray.push(new Review({
            content: contents[randomIndex],
            doctorRef: mongoose.Types.ObjectId(docId.toString()),
            patientRef: {
                patientId: mongoose.Types.ObjectId(patId.toString()),
                patientName: `${names[patInd].firstName} ${names[patInd].lastName}`,
            },
            rating: randomIndex,
        }));
    }
    return await Review.insertMany(reviewsArray);
}

async function createServices(doctorsId: any[]): Promise<IService[]> {
    let i = 0;
    let j =0;

    const durations = [15, 20, 25, 30, 35, 40, 45, 50, 60, 90];

    const servicesArray: Array<IService> = [];
    for (i = 0; i < 40; i++) {
        for (j = 0; j < 3; j++) {
            servicesArray.push(new Service({
                description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac lorem sed ligula 
                accumsan ornare eu ac ex. Etiam porttitor suscipit ipsum a ultrices. Nam dictum non turpis vita feugiat.
                Proin vitae dui rhoncus, aliquam massa sit amet, tempus purus. Morbi eleifend enim tortor. Nullam 
                hendrerit rutrum neque. Sed ac.`,
                doctorRef: mongoose.Types.ObjectId(doctorsId[i].toString()),
                estimatedDuration: durations[Math.floor(Math.random() * durations.length)],
                name: `Service-${j+1}`,
                privateCovered: j < 2 ? true : false,
                publicCovered: j > 0 ? true : false,
                timesSelected: Math.floor(Math.random() * 15),
            }));
        }
    }
    return await Service.insertMany(servicesArray);
}

async function createAppointments(patientsId: any[], servicesInfo: any[], names: any[]): Promise<IAppointment[]> {
    let i = 0;
    let j = 0;

    const appointmentssArray: Array<IAppointment> = [];
    for (i = 0; i < servicesInfo.length; i++) {
        for (j = 0; j < servicesInfo[i].cnt; j++) {
            const month = Math.floor(Math.random() * 5) + 1;
            const day = Math.floor(Math.random() * 28) + 1;
            const hours = Math.floor(Math.random() * 8) + 10;
            const minutes = Math.floor(Math.random() * 60);
            const dur = servicesInfo[i].dur + Math.floor(Math.random() * 20);
            const expTime = new Date(2021, month, day, hours, minutes);
            
            const doc = await User.findOne({ 'doctorRef': servicesInfo[i].docRef });
            if (!doc) continue;
            const patInd = Math.floor(Math.random() * patientsId.length);
            const patId = patientsId[patInd];

            appointmentssArray.push(new Appointment({
                actualDuration: dur,
                actualTime: new Date(expTime.getTime() + dur*60000),
                doctorRef: {
                    doctorId: servicesInfo[i].docRef,
                    doctorName: `${doc.firstName} ${doc.lastName}`,
                },
                expectedDuration: servicesInfo[i].dur,
                expectedTime: expTime,
                insurance: Math.round(Math.random()),
                patientNotes: '',
                patientRef: {
                    patientId: mongoose.Types.ObjectId(patId.toString()),
                    patientName: `${names[patInd].firstName} ${names[patInd].lastName}`,
                },
                selectedServices: {
                    serviceId: servicesInfo[i]._id,
                    serviceName: servicesInfo[i].name,
                },
                sharedData: Math.round(Math.random()),
            }));
        }
    }
    return await Appointment.insertMany(appointmentssArray);

}

async function createCheckups(patientsId: any[], patientsInfo: any[], names: any[]): Promise<ICheckup[]> {
    let i = 0;

    const checkupsArray: Array<ICheckup> = [];
    for (i = 0; i < 50; i++) {
        const month = Math.floor(Math.random() * 6) + 6;
        const day = Math.floor(Math.random() * 28) + 1;
        const date = new Date(2021, month, day);
        const patInd = Math.floor(Math.random() * patientsId.length);
        const patId = patientsId[patInd];
        const patAddr = patientsInfo[patInd].address;
        const patIns = patientsInfo[patInd].insurance;

        checkupsArray.push(new Checkup({
            isRead: Math.round(Math.random()) === 0 ? false : true,
            patientRef: {
                patientAddress: patAddr,
                patientId: mongoose.Types.ObjectId(patId.toString()),
                patientInsurance: patIns,
                patientName: `${names[patInd].firstName} ${names[patInd].lastName}`,
            },
            services: Math.round(Math.random()) === 0 ? 'Teeth Cleaning' : 'Skin Cancer Screening',
            suggestedDate: date,
        }));
    }
    return await Checkup.insertMany(checkupsArray);
}

async function createFollowups(patientsId: any[], doctorsId: any[], patientsInfo: any[],
    names: any[]): Promise<IFollowup[]> {
    let i = 0;

    const followupsArray: Array<IFollowup> = [];
    for (i = 0; i < 50; i++) {
        const month = Math.floor(Math.random() * 6) + 6;
        const day = Math.floor(Math.random() * 28) + 1;
        const date = new Date(2021, month, day);
        const patInd = Math.floor(Math.random() * patientsId.length);
        const patId = patientsId[patInd];
        const patAddr = patientsInfo[patInd].address;
        const patIns = patientsInfo[patInd].insurance;

        const doc = await User.findOne({ 'doctorRef': doctorsId[i%40]._id });
        if (!doc) continue;

        const services = await Service.find({ 'doctorRef': doctorsId[i%40]._id });
        if (!services) continue;
        const servInd = Math.floor(Math.random() * 2);

        followupsArray.push(new Followup({
            doctorNotes: `Lorem ipsum dolor sit amet, consectet adipiscing lit. Donec cursus augue eget euismod auctor. 
            Proin sed augue cursus, ultricies leo.`,
            doctorRef: {
                doctorId: doc.doctorRef,
                doctorName: `${doc.firstName} ${doc.lastName}`,
            },
            isRead: Math.round(Math.random()) === 0 ? false : true,
            patientRef: {
                patientAddress: patAddr,
                patientId: mongoose.Types.ObjectId(patId.toString()),
                patientInsurance: patIns,
                patientName: `${names[patInd].firstName} ${names[patInd].lastName}`,
            },
            services: {
                serviceId: services[servInd]._id,
                serviceName: services[servInd].name,
            },
            suggestedDate: date,
        }));
    }
    return await Followup.insertMany(followupsArray);
}

async function fixTopServices(doctorsId: any[]) {
    let i = 0;

    for (i = 0; i < doctorsId.length; i++) {
        const topServices = await Service.find({ 'doctorRef': doctorsId[i]._id }, { _id: 1, name: 1 }).
            sort({ 'timesSelected': -1 });
        if (!topServices) continue;
        const topServicesR = topServices.map(function(service) {
            const servId = service._id === undefined ? '' : service._id;
            return { 'serviceId': servId, 'serviceName': service.name };

        });
        await Doctor.updateOne({ '_id': doctorsId[i]._id },
            { 'topServices': topServicesR.slice(10) as IMiniService[] });
    }
}

async function fixTopReviews(doctorsId: any[]) {
    let i = 0;

    for (i = 0; i < doctorsId.length; i++) {
        const topReviews = await Review.find({ 'doctorRef': doctorsId[i]._id }, { _id: 1, content: 1, rating: 1 }).
            sort({ 'rating': -1 });
        if (!topReviews) continue;
        const topReviewsR = topReviews.map(function(review) {
            const revId = review._id === undefined ? '' : review._id;
            const revCont = review.content === undefined ? '' : review.content;
            return { 'reviewContent': revCont, 'reviewId': revId, 'reviewRating': review.rating };

        });
        await Doctor.updateOne({ '_id': doctorsId[i]._id },
            { 'topReviews': topReviewsR.slice(10) as IMiniReview[] });
    }
}

async function fixRatings(doctorsId: any[]) {
    let i = 0;

    for (i = 0; i < doctorsId.length; i++) {
        const res = await Review.aggregate([
            {
                $match: { 'doctorRef': mongoose.Types.ObjectId(doctorsId[i]._id) },
            },
            {
                $group: {
                    _id: '$item',
                    starRating: {
                        $avg: '$rating',
                    },
                },
            },
        ]) as { _id: string, starRating: number }[];
        if (res[0] === undefined) continue;

        await Doctor.updateOne({ '_id': doctorsId[i]._id },
            { 'starRating': res[0].starRating as number });
    }
}

export async function populateDB() {
    
    // Read Names
    const names = readNames();
    console.log('Read Names OK');

    // Drop all existing Collections
    dropCollections();
    console.log('Drop all existing Collections OK');

    // Insert Patients
    const patients = await createPatients();
    const patientsId = patients.map(function(patient) { return patient._id;});
    const patientsInfo = patients.map(function(patient) {
        return { 'address': patient.address, 'insurance': patient.insurance };
    });
    console.log('Insert Patients OK');

    // Insert Doctors
    const doctors = await createDoctors(names);
    const doctorsId = doctors.map(function(doctor) { return doctor._id; });
    console.log('Insert Doctors OK');

    // Insert Users
    const users = await createUsers(patientsId, doctorsId, names);
    console.log('Insert Users OK');

    // Insert Reviews
    const reviews = await createReviews(patientsId, doctorsId, names);
    console.log('Insert Reviews OK');

    // Insert Services
    const services = await createServices(doctorsId);
    const servicesInfo = services.map(function(service) {
        return {
            '_id': service._id,
            'cnt': service.timesSelected ? service.timesSelected : 0,
            'docRef': service.doctorRef,
            'dur': service.estimatedDuration,
            'name': service.name,
        };
    });
    console.log('Insert Services OK');

    // Insert Appointments
    const appointments = await createAppointments(patientsId, servicesInfo, names);
    console.log('Insert Appointments OK');

    // Insert Checkups
    const checkups = await createCheckups(patientsId, patientsInfo, names);
    console.log('Insert Checkups OK');

    // Insert Followups
    const followups = await createFollowups(patientsId, doctorsId, patientsInfo, names);
    console.log('Insert Followups OK');

    // Fix Top Services & Top Reviews for Doctors
    await fixTopServices(doctorsId);
    console.log('Fix Top Services for Doctors OK');

    await fixTopReviews(doctorsId);
    console.log('Fix Top Reviews for Doctors OK');

    // Fix Doctor's Rating
    await fixRatings(doctorsId);
    console.log("Fix Doctor's Rating OK");

    /* Testing
    const res = await Review.aggregate([
        {
            $match: { 'doctorRef': mongoose.Types.ObjectId('60bf5c20688c7d15d341ac75') },
        },
        {
            $group: {
                _id: '$item',
                starRating: {
                    $avg: '$rating',
                },
            },
        },
    ]) as { _id: string, starRating: number }[];
    console.log(res);
    await Doctor.updateOne({ '_id': doctorsId[i]._id },
        { 'starRating': res[0].starRating as number });*/
}

