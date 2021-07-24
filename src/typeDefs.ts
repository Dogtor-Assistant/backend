import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    # An object with a Globally Unique ID
    interface Node {
        # The ID of the object.
        id: ID!
    }

    # Date and time of an event encoded as an ISO 8601 string
    scalar DateTime

    scalar URL

    # Length in centimeters
    scalar Length

    # Weight in grams
    scalar Weight

    enum Insurance {
        Public
        Private
    }

    enum Gender {
        Male
        Female
        TransgenderMale
        TransgenderFemale
        NonBinary
    }

    enum Weekday {
        Monday
        Tuesday
        Wednesday
        Thursday
        Friday
        Saturday
        Sunday
    }

    enum ActivityLevel {
        VeryHigh
        High
        Medium
        Low
        VeryLow
    }

    type Address {
        streetName: String!
        streetNumber: Int!
        city: String!
        zipCode: Int!
        coordinates: Coordinates!
    }

    type AppointmentTime {
        start: DateTime
        duration: Int
    }

    type Appointment implements Node {
        id: ID!
        patient: Patient!
        doctor: Doctor!

        expectedTime: AppointmentTime!
        # Time of the appointment after delays
        actualTime: AppointmentTime
        
        insurance: Insurance!
        notes: String
        sharedData: Boolean!
        selectedServices: [Service!]!
        isDone: Boolean!
    }

    type Checkup implements Node {
        id: ID!
        isRead: Boolean!
        services: [String!]!
        suggestedDate: DateTime!
    }

    type Doctor implements Node {
        id: ID!
        
        firstname: String!
        lastname: String!

        specialities: [String!]!

        address: Address!
        offeredSlots: [OfferedSlot!]!

        rating: Float!

        topServices: [Service!]!
        topReviews: [Review!]!
        
        webpage: URL
        appointments: [Appointment!]!
        reviews(after: String, first: Int, before: String, last: Int): ReviewsConnection!
        services: [Service!]!
    }

    type Followup implements Node {
        id: ID!
        isRead: Boolean!

        doctor: Doctor!
        services: [Service!]!
        suggestedDate: DateTime!
    }

    type OfferedSlot {
        day: Weekday!
        start: String!
        end: String!
    }

    type Recommendation {
        service: String!
        kind: String!
        periodInDays: Int
    }

    type Patient implements Node {
        id: ID!
        
        firstname: String!
        lastname: String!

        activityLevel: ActivityLevel
        birthDate: DateTime
        insurance: Insurance!
        gender: Gender
        height: Length
        weight: Weight

        medications: [String!]!
        medicalConditions: [String!]!
        allergies: [String!]!
        surgeries: [String!]!
        
        isSmoker: Boolean

        address: Address!

        checkupRecommendations: [Recommendation!]!
        unreadCheckups: [Checkup!]!
    }

    type Review implements Node {
        id: ID!

        rating: Int!

        doctor: Doctor!
        patient: Patient!

        content: String
    }

    type Service implements Node {
        id: ID!
        name: String!

        doctor:Doctor!

        description: String
        estimatedDuration: Int
        publicCovered: Boolean
        privateCovered: Boolean
        timesSelected: Int!
    }

    type User implements Node {
        id: ID!
        firstname: String!
        lastname: String!
        doctorProfile: Doctor
        patientProfile: Patient
    }

    type PageInfo {
        hasNextPage: Boolean!
        hasPreviousPage: Boolean!
        startCursor: String
        endCursor: String
    }

    type UserEdge {
        cursor: String!
        node: User
    }
    
    type UsersConnection {
        pageInfo: PageInfo!
        edges: [UserEdge]
    }

    type ReviewEdge {
        cursor: String!
        node: Review
    }
    
    type ReviewsConnection {
        pageInfo: PageInfo!
        edges: [ReviewEdge]
    }

    type DoctorEdge {
        cursor: String!
        node: Doctor
    }
    
    type DoctorsConnection {
        pageInfo: PageInfo!
        edges: [DoctorEdge]
    }

    type PatientEdge {
        cursor: String!
        node: Patient
    }
    
    type PatientsConnection {
        pageInfo: PageInfo!
        edges: [PatientEdge]
    }

    type ServiceEdge {
        cursor: String!
        node: Service
    }
    
    type ServicesConnection {
        pageInfo: PageInfo!
        edges: [ServiceEdge]
    }

    type AppointmentEdge {
        cursor: String!
        node: Appointment
    }
    
    type AppointmentsConnection {
        pageInfo: PageInfo!
        edges: [AppointmentEdge]
    }

    type Coordinates {
        latitude: Float!
        longitude: Float!
    }

    type NearbyLocation {
        label: String!
        coordinates: Coordinates!
        maximumDistanceInMeters: Int!
    }

    input CoordinatesInput {
        latitude: Float!
        longitude: Float!
    }

    input NearbyLocationInput {
        label: String!
        coordinates: CoordinatesInput!
        maximumDistanceInMeters: Int!
    }

    type SearchScope {
        query: String
        specialities: [String!]
        cities: [String!]
        nearby: NearbyLocation
        minRating: Float
    }

    type SearchSuggestions {
        specialities: [String!]
        cities: [String!]
        nearby: NearbyLocation
        minRating: Float
    }

    type Search implements Node {
        id: ID!
        
        scope: SearchScope!
        suggestions: SearchSuggestions!

        results(
            after: String, 
            first: Int, 
            before: String, 
            last: Int,
        ): DoctorsConnection!
    }

    input AddressInput {
        streetName: String!
        streetNumber: Int!
        city: String!
        zipCode: Int!
        lat: Float!
        lon: Float!
    }

    input OfferedSlotInput {
        day: Weekday!
        slotStart: String!
        slotStop: String!
    }

    input AppointmentInput{
        doctorId: ID!
        expectedDuration : Int!
        expectedTime : DateTime!
        insurance : Insurance!
        patientNotes: String,
        selectedServices : [ID!]!
        shareData: Boolean!
    }


    input UserDoctorInput {
        email: String!
        firstName: String!
        lastName: String!
        password: String!

        address: AddressInput!
        phoneNumber: String!
        webpage: URL

        specialities: [String!]!
        offeredSlots: [OfferedSlotInput]!
    }

    input UserPatientInput {
        email: String!
        firstName: String!
        lastName: String!
        password: String!

        address: AddressInput!
        phoneNumber: String!
        insurance: Insurance!

        birthDate: DateTime
        gender: Gender
        height: Int
        weight: Int
        activityLvl: ActivityLevel
        smoker: Boolean

        allergies: [String]!
        medConditions: [String]!
        medications: [String]!
        surgeries: [String]!
    }

    input UserPatientInputUpd {
        id: ID!
        birthDate: DateTime!
        gender: Gender!
        insurance: Insurance!
    }

    input ServiceInput {
        serviceId: ID!
        serviceName: String!
    }

    input FollowupInput {
        doctorRef: ID!,
        patientRef: ID!,
        services: [ServiceInput!]!,
        suggestedDate: DateTime!,
        doctorNotes: String
    }

    input RecommendationInput {
        service: String!
        kind: String!
        periodInDays: Int
    }

    input CheckupsGenInput {
        id: ID!
        recommendations: [RecommendationInput!]!
    }

    type Query {
        greeting: String!
        me: User
        node(id: ID!): Node

        search(
            query: String
            specialities: [String!]
            cities: [String!]
            nearby: NearbyLocationInput
            minRating: Float
        ): Search!
        
        users(after: String, first: Int, before: String, last: Int): UsersConnection!
        patients(after: String, first: Int, before: String, last: Int): PatientsConnection!
        doctors(after: String, first: Int, before: String, last: Int): DoctorsConnection!
        reviews(after: String, first: Int, before: String, last: Int): ReviewsConnection!
        services(after: String, first: Int, before: String, last: Int): ServicesConnection!
        latestReviews: [Review!]!
        patientUpcomingAppointments(id: ID!): [Appointment!]!
        patientPreviousAppointments(id: ID!): [Appointment!]!

        cities: [String!]!
        specialities: [String!]!
    }

    type Mutation {
        createUserDoctor(input: UserDoctorInput!): User
        deleteAppointmentById(id:ID!): Boolean!
        makeAppointmentAsDone(id:ID!): Boolean!
        assignFollowup(followupInput:FollowupInput!): Boolean!
        createUserPatient(input: UserPatientInput!): User
        createAppointment(input: AppointmentInput!): Appointment!
        updateUserPatientProfile(input: UserPatientInputUpd!): Patient
        generateCheckups(input: CheckupsGenInput!): [Checkup!]!
        markCheckupAsRead(id: ID!): Boolean!
    }
    
    type Subscription {
        appointmentFinished: Int!
    }
    
    schema {
        query: Query
        mutation: Mutation
        subscription: Subscription
    }
`;
