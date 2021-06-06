
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    # An object with a Globally Unique ID
    interface Node {
        # The ID of the object.
        id: ID!
    }

    # Duration of time encoded as a floating point number of seconds
    scalar TimeInterval
    
    # Date and time of an event encoded as an ISO 8601 string
    scalar DateTime

    # Time of the date encoded as HH:mm
    scalar Time

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
        Friday
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
        streetNumber: String!
        city: String!
        zipCode: String!
    }

    type AppointmentTime {
        start: DateTime
        duration: TimeInterval
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
    }

    type Checkup implements Node {
        id: ID!
        isRead: Boolean!
        services: [Service!]!
        suggestedDate: DateTime!
    }

    type Doctor implements Node {
        id: ID!
        
        firstname: String!
        lastname: String!

        specialty: String!

        address: Address!
        offeredSlots: [OfferedSlot!]!

        rating: Float!

        topServices: [Service!]!
        topReviews: [Review!]!
        
        webpage: URL
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
        start: Time!
        end: Time!
    }

    type Patient implements Node {
        id: ID!
        
        firstname: String!
        lastname: String!

        activityLevel: ActivityLevel
        gender: Gender
        height: Length
        weight: Weight

        medications: [String!]!
        medicalConditions: [String!]!
        allergies: [String!]!
        surgeries: [String!]!
        
        isSmoker: Boolean
    }

    type Review implements Node {
        id: ID!

        rating: Int!

        doctor: Doctor!
        patient: Doctor!

        content: String
    }

    type Service implements Node {
        id: ID!
    }

    type User implements Node {
        id: ID!
        firstname: String!
        lastname: String!
        doctorProfile: Doctor
        patientProfile: Patient
    }

    type Query {
        greeting: String!
        me: User
        node(id: ID!): Node
    }

    schema {
        query: Query
    }
`;
