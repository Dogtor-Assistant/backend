/* eslint-disable */
import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { User as UserModel } from 'shims/user';
import type { Doctor as DoctorModel } from 'shims/doctor';
import type { Patient as PatientModel } from 'shims/patient';
import type { Gender as GenderModel, ActivityLevel as ActivityLevelModel } from 'models/Patient';
import type { Day as DayModel } from 'models/Doctor';
import type { Insurance as InsuranceModel, IAppointment as IAppointmentModel } from 'models/Appointment';
import type { ICheckup as ICheckupModel } from 'models/Checkup';
import type { IFollowup as IFollowupModel } from 'models/Followup';
import type { Review as ReviewModel } from 'shims/review';
import type { Service as ServiceModel } from 'shims/service';
import type { PageInfo as PageInfoModel, ReviewsConnection as ReviewsConnectionModel, UsersConnection as UsersConnectionModel, DoctorsConnection as DoctorsConnectionModel, PatientsConnection as PatientsConnectionModel, ServicesConnection as ServicesConnectionModel, AppointmentsConnection as AppointmentsConnectionModel, ReviewEdge as ReviewEdgeModel, UserEdge as UserEdgeModel, DoctorEdge as DoctorEdgeModel, PatientEdge as PatientEdgeModel, ServiceEdge as ServiceEdgeModel, AppointmentEdge as AppointmentEdgeModel } from 'pagination';
import type { SearchObject as SearchObjectModel } from 'search/types';
import type { Context } from 'context';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type EnumResolverSignature<T, AllowedValues = any> = { [key in keyof T]?: AllowedValues };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: Date;
  Duration: number;
  Length: number;
  URL: string;
  Weight: number;
};

export enum ActivityLevel {
  VeryHigh = 'VeryHigh',
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
  VeryLow = 'VeryLow'
}

export type Address = {
  readonly streetName: Scalars['String'];
  readonly streetNumber: Scalars['Int'];
  readonly city: Scalars['String'];
  readonly zipCode: Scalars['Int'];
};

export type AddressInput = {
  readonly streetName: Scalars['String'];
  readonly streetNumber: Scalars['Int'];
  readonly city: Scalars['String'];
  readonly zipCode: Scalars['Int'];
};

export type Appointment = Node & {
  readonly id: Scalars['ID'];
  readonly patient: Patient;
  readonly doctor: Doctor;
  readonly expectedTime: AppointmentTime;
  readonly actualTime: Maybe<AppointmentTime>;
  readonly insurance: Insurance;
  readonly notes: Maybe<Scalars['String']>;
  readonly sharedData: Scalars['Boolean'];
  readonly selectedServices: ReadonlyArray<Service>;
  readonly isDone: Scalars['Boolean'];
};

export type AppointmentEdge = {
  readonly cursor: Scalars['String'];
  readonly node: Maybe<Appointment>;
};

export type AppointmentTime = {
  readonly start: Maybe<Scalars['DateTime']>;
  readonly duration: Maybe<Scalars['Duration']>;
};

export type AppointmentsConnection = {
  readonly pageInfo: PageInfo;
  readonly edges: Maybe<ReadonlyArray<Maybe<AppointmentEdge>>>;
};

export type Checkup = Node & {
  readonly id: Scalars['ID'];
  readonly isRead: Scalars['Boolean'];
  readonly services: ReadonlyArray<Service>;
  readonly suggestedDate: Scalars['DateTime'];
};


export type Doctor = Node & {
  readonly id: Scalars['ID'];
  readonly firstname: Scalars['String'];
  readonly lastname: Scalars['String'];
  readonly specialities: ReadonlyArray<Scalars['String']>;
  readonly address: Address;
  readonly offeredSlots: ReadonlyArray<OfferedSlot>;
  readonly rating: Scalars['Float'];
  readonly topServices: ReadonlyArray<Service>;
  readonly topReviews: ReadonlyArray<Review>;
  readonly webpage: Maybe<Scalars['URL']>;
};

export type DoctorEdge = {
  readonly cursor: Scalars['String'];
  readonly node: Maybe<Doctor>;
};

export type DoctorsConnection = {
  readonly pageInfo: PageInfo;
  readonly edges: Maybe<ReadonlyArray<Maybe<DoctorEdge>>>;
};


export type Followup = Node & {
  readonly id: Scalars['ID'];
  readonly isRead: Scalars['Boolean'];
  readonly doctor: Doctor;
  readonly services: ReadonlyArray<Service>;
  readonly suggestedDate: Scalars['DateTime'];
};

export type FollowupInput = {
  readonly doctorId: Scalars['ID'];
  readonly patientId: Scalars['ID'];
  readonly services: ReadonlyArray<Scalars['String']>;
  readonly suggestedDate: Scalars['DateTime'];
  readonly isRead: Scalars['Boolean'];
  readonly doctorNotes: Maybe<Scalars['String']>;
};

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  TransgenderMale = 'TransgenderMale',
  TransgenderFemale = 'TransgenderFemale',
  NonBinary = 'NonBinary'
}

export enum Insurance {
  Public = 'Public',
  Private = 'Private'
}


export type Mutation = {
  readonly createUserDoctor: Maybe<User>;
  readonly deleteAppointmentById: Scalars['Boolean'];
  readonly makeAppointmentAsDone: Scalars['Boolean'];
  readonly assignFollowup: Scalars['Boolean'];
  readonly createUserPatient: Maybe<User>;
};


export type MutationCreateUserDoctorArgs = {
  input: UserDoctorInput;
};

export type MutationDeleteAppointmentByIdArgs = {
  id: Scalars['ID'];
};


export type MutationMakeAppointmentAsDoneArgs = {
  id: Scalars['ID'];
};


export type MutationAssignFollowupArgs = {
  followupInput: FollowupInput;
}
export type MutationCreateUserPatientArgs = {
  input: UserPatientInput;
};

export type Node = {
  readonly id: Scalars['ID'];
};

export type OfferedSlot = {
  readonly day: Weekday;
  readonly start: Scalars['String'];
  readonly end: Scalars['String'];
};

export type OfferedSlotInput = {
  readonly day: Weekday;
  readonly slotStart: Scalars['String'];
  readonly slotStop: Scalars['String'];
};

export type PageInfo = {
  readonly hasNextPage: Scalars['Boolean'];
  readonly hasPreviousPage: Scalars['Boolean'];
  readonly startCursor: Maybe<Scalars['String']>;
  readonly endCursor: Maybe<Scalars['String']>;
};

export type Patient = Node & {
  readonly id: Scalars['ID'];
  readonly firstname: Scalars['String'];
  readonly lastname: Scalars['String'];
  readonly activityLevel: Maybe<ActivityLevel>;
  readonly gender: Maybe<Gender>;
  readonly height: Maybe<Scalars['Length']>;
  readonly weight: Maybe<Scalars['Weight']>;
  readonly medications: ReadonlyArray<Scalars['String']>;
  readonly medicalConditions: ReadonlyArray<Scalars['String']>;
  readonly allergies: ReadonlyArray<Scalars['String']>;
  readonly surgeries: ReadonlyArray<Scalars['String']>;
  readonly isSmoker: Maybe<Scalars['Boolean']>;
};

export type PatientEdge = {
  readonly cursor: Scalars['String'];
  readonly node: Maybe<Patient>;
};

export type PatientsConnection = {
  readonly pageInfo: PageInfo;
  readonly edges: Maybe<ReadonlyArray<Maybe<PatientEdge>>>;
};

export type Query = {
  readonly greeting: Scalars['String'];
  readonly me: Maybe<User>;
  readonly node: Maybe<Node>;
  readonly search: Search;
  readonly appointments: ReadonlyArray<Appointment>;
  readonly users: UsersConnection;
  readonly patients: PatientsConnection;
  readonly doctors: DoctorsConnection;
  readonly reviews: ReviewsConnection;
  readonly services: ServicesConnection;
  readonly latestReviews: ReadonlyArray<Review>;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QuerySearchArgs = {
  query: Maybe<Scalars['String']>;
  specialities: Maybe<ReadonlyArray<Scalars['String']>>;
  cities: Maybe<ReadonlyArray<Scalars['String']>>;
};


export type QueryAppointmentsArgs = {
  doctorId: Scalars['ID'];
};


export type QueryUsersArgs = {
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  before: Maybe<Scalars['String']>;
  last: Maybe<Scalars['Int']>;
};


export type QueryPatientsArgs = {
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  before: Maybe<Scalars['String']>;
  last: Maybe<Scalars['Int']>;
};


export type QueryDoctorsArgs = {
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  before: Maybe<Scalars['String']>;
  last: Maybe<Scalars['Int']>;
};


export type QueryReviewsArgs = {
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  before: Maybe<Scalars['String']>;
  last: Maybe<Scalars['Int']>;
};


export type QueryServicesArgs = {
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  before: Maybe<Scalars['String']>;
  last: Maybe<Scalars['Int']>;
};

export type Review = Node & {
  readonly id: Scalars['ID'];
  readonly rating: Scalars['Int'];
  readonly doctor: Doctor;
  readonly patient: Patient;
  readonly content: Maybe<Scalars['String']>;
};

export type ReviewEdge = {
  readonly cursor: Scalars['String'];
  readonly node: Maybe<Review>;
};

export type ReviewsConnection = {
  readonly pageInfo: PageInfo;
  readonly edges: Maybe<ReadonlyArray<Maybe<ReviewEdge>>>;
};

export type Search = Node & {
  readonly id: Scalars['ID'];
  readonly scope: SearchScope;
  readonly suggestions: SearchSuggestions;
  readonly results: DoctorsConnection;
};


export type SearchResultsArgs = {
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  before: Maybe<Scalars['String']>;
  last: Maybe<Scalars['Int']>;
};

export type SearchScope = {
  readonly query: Maybe<Scalars['String']>;
  readonly specialities: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly cities: Maybe<ReadonlyArray<Scalars['String']>>;
};

export type SearchSuggestions = {
  readonly specialities: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly cities: Maybe<ReadonlyArray<Scalars['String']>>;
};

export type Service = Node & {
  readonly id: Scalars['ID'];
};

export type ServiceEdge = {
  readonly cursor: Scalars['String'];
  readonly node: Maybe<Service>;
};

export type ServicesConnection = {
  readonly pageInfo: PageInfo;
  readonly edges: Maybe<ReadonlyArray<Maybe<ServiceEdge>>>;
};


export type User = Node & {
  readonly id: Scalars['ID'];
  readonly firstname: Scalars['String'];
  readonly lastname: Scalars['String'];
  readonly doctorProfile: Maybe<Doctor>;
  readonly patientProfile: Maybe<Patient>;
};

export type UserDoctorInput = {
  readonly email: Scalars['String'];
  readonly firstName: Scalars['String'];
  readonly lastName: Scalars['String'];
  readonly password: Scalars['String'];
  readonly address: AddressInput;
  readonly phoneNumber: Scalars['String'];
  readonly webpage: Maybe<Scalars['URL']>;
  readonly specialities: ReadonlyArray<Scalars['String']>;
  readonly offeredSlots: ReadonlyArray<Maybe<OfferedSlotInput>>;
};

export type UserEdge = {
  readonly cursor: Scalars['String'];
  readonly node: Maybe<User>;
};

export type UserPatientInput = {
  readonly email: Scalars['String'];
  readonly firstName: Scalars['String'];
  readonly lastName: Scalars['String'];
  readonly password: Scalars['String'];
  readonly address: AddressInput;
  readonly phoneNumber: Scalars['String'];
  readonly insurance: Insurance;
  readonly birthDate: Maybe<Scalars['DateTime']>;
  readonly gender: Maybe<Gender>;
  readonly height: Maybe<Scalars['Int']>;
  readonly weight: Maybe<Scalars['Int']>;
  readonly activityLvl: Maybe<ActivityLevel>;
  readonly smoker: Maybe<Scalars['Boolean']>;
  readonly allergies: ReadonlyArray<Maybe<Scalars['String']>>;
  readonly medConditions: ReadonlyArray<Maybe<Scalars['String']>>;
  readonly medications: ReadonlyArray<Maybe<Scalars['String']>>;
  readonly surgeries: ReadonlyArray<Maybe<Scalars['String']>>;
};

export type UsersConnection = {
  readonly pageInfo: PageInfo;
  readonly edges: Maybe<ReadonlyArray<Maybe<UserEdge>>>;
};

export enum Weekday {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday'
}


export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  ActivityLevel: ResolverTypeWrapper<ActivityLevelModel>;
  Address: ResolverTypeWrapper<Address>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  AddressInput: AddressInput;
  Appointment: ResolverTypeWrapper<IAppointmentModel>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  AppointmentEdge: ResolverTypeWrapper<AppointmentEdgeModel>;
  AppointmentTime: ResolverTypeWrapper<AppointmentTime>;
  AppointmentsConnection: ResolverTypeWrapper<AppointmentsConnectionModel>;
  Checkup: ResolverTypeWrapper<ICheckupModel>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Doctor: ResolverTypeWrapper<DoctorModel>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  DoctorEdge: ResolverTypeWrapper<DoctorEdgeModel>;
  DoctorsConnection: ResolverTypeWrapper<DoctorsConnectionModel>;
  Duration: ResolverTypeWrapper<Scalars['Duration']>;
  Followup: ResolverTypeWrapper<IFollowupModel>;
  FollowupInput: FollowupInput;
  Gender: ResolverTypeWrapper<GenderModel>;
  Insurance: ResolverTypeWrapper<InsuranceModel>;
  Length: ResolverTypeWrapper<Scalars['Length']>;
  Mutation: ResolverTypeWrapper<{}>;
  Node: ResolversTypes['Appointment'] | ResolversTypes['Checkup'] | ResolversTypes['Doctor'] | ResolversTypes['Followup'] | ResolversTypes['Patient'] | ResolversTypes['Review'] | ResolversTypes['Search'] | ResolversTypes['Service'] | ResolversTypes['User'];
  OfferedSlot: ResolverTypeWrapper<Omit<OfferedSlot, 'day'> & { day: ResolversTypes['Weekday'] }>;
  OfferedSlotInput: OfferedSlotInput;
  PageInfo: ResolverTypeWrapper<PageInfoModel>;
  Patient: ResolverTypeWrapper<PatientModel>;
  PatientEdge: ResolverTypeWrapper<PatientEdgeModel>;
  PatientsConnection: ResolverTypeWrapper<PatientsConnectionModel>;
  Query: ResolverTypeWrapper<{}>;
  Review: ResolverTypeWrapper<ReviewModel>;
  ReviewEdge: ResolverTypeWrapper<ReviewEdgeModel>;
  ReviewsConnection: ResolverTypeWrapper<ReviewsConnectionModel>;
  Search: ResolverTypeWrapper<SearchObjectModel>;
  SearchScope: ResolverTypeWrapper<SearchScope>;
  SearchSuggestions: ResolverTypeWrapper<SearchSuggestions>;
  Service: ResolverTypeWrapper<ServiceModel>;
  ServiceEdge: ResolverTypeWrapper<ServiceEdgeModel>;
  ServicesConnection: ResolverTypeWrapper<ServicesConnectionModel>;
  URL: ResolverTypeWrapper<Scalars['URL']>;
  User: ResolverTypeWrapper<UserModel>;
  UserDoctorInput: UserDoctorInput;
  UserEdge: ResolverTypeWrapper<UserEdgeModel>;
  UserPatientInput: UserPatientInput;
  UsersConnection: ResolverTypeWrapper<UsersConnectionModel>;
  Weekday: ResolverTypeWrapper<DayModel>;
  Weight: ResolverTypeWrapper<Scalars['Weight']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Address: Address;
  String: Scalars['String'];
  Int: Scalars['Int'];
  AddressInput: AddressInput;
  Appointment: IAppointmentModel;
  ID: Scalars['ID'];
  Boolean: Scalars['Boolean'];
  AppointmentEdge: AppointmentEdgeModel;
  AppointmentTime: AppointmentTime;
  AppointmentsConnection: AppointmentsConnectionModel;
  Checkup: ICheckupModel;
  DateTime: Scalars['DateTime'];
  Doctor: DoctorModel;
  Float: Scalars['Float'];
  DoctorEdge: DoctorEdgeModel;
  DoctorsConnection: DoctorsConnectionModel;
  Duration: Scalars['Duration'];
  Followup: IFollowupModel;
  FollowupInput: FollowupInput;
  Length: Scalars['Length'];
  Mutation: {};
  Node: ResolversParentTypes['Appointment'] | ResolversParentTypes['Checkup'] | ResolversParentTypes['Doctor'] | ResolversParentTypes['Followup'] | ResolversParentTypes['Patient'] | ResolversParentTypes['Review'] | ResolversParentTypes['Search'] | ResolversParentTypes['Service'] | ResolversParentTypes['User'];
  OfferedSlot: Omit<OfferedSlot, 'day'> & { day: ResolversParentTypes['Weekday'] };
  OfferedSlotInput: OfferedSlotInput;
  PageInfo: PageInfoModel;
  Patient: PatientModel;
  PatientEdge: PatientEdgeModel;
  PatientsConnection: PatientsConnectionModel;
  Query: {};
  Review: ReviewModel;
  ReviewEdge: ReviewEdgeModel;
  ReviewsConnection: ReviewsConnectionModel;
  Search: SearchObjectModel;
  SearchScope: SearchScope;
  SearchSuggestions: SearchSuggestions;
  Service: ServiceModel;
  ServiceEdge: ServiceEdgeModel;
  ServicesConnection: ServicesConnectionModel;
  URL: Scalars['URL'];
  User: UserModel;
  UserDoctorInput: UserDoctorInput;
  UserEdge: UserEdgeModel;
  UserPatientInput: UserPatientInput;
  UsersConnection: UsersConnectionModel;
  Weight: Scalars['Weight'];
}>;

export type ActivityLevelResolvers = EnumResolverSignature<{ VeryHigh: any, High: any, Medium: any, Low: any, VeryLow: any }, ResolversTypes['ActivityLevel']>;

export type AddressResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = ResolversObject<{
  streetName: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  streetNumber: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  city: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  zipCode: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AppointmentResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Appointment'] = ResolversParentTypes['Appointment']> = ResolversObject<{
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  patient: Resolver<ResolversTypes['Patient'], ParentType, ContextType>;
  doctor: Resolver<ResolversTypes['Doctor'], ParentType, ContextType>;
  expectedTime: Resolver<ResolversTypes['AppointmentTime'], ParentType, ContextType>;
  actualTime: Resolver<Maybe<ResolversTypes['AppointmentTime']>, ParentType, ContextType>;
  insurance: Resolver<ResolversTypes['Insurance'], ParentType, ContextType>;
  notes: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sharedData: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  selectedServices: Resolver<ReadonlyArray<ResolversTypes['Service']>, ParentType, ContextType>;
  isDone: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AppointmentEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AppointmentEdge'] = ResolversParentTypes['AppointmentEdge']> = ResolversObject<{
  cursor: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node: Resolver<Maybe<ResolversTypes['Appointment']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AppointmentTimeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AppointmentTime'] = ResolversParentTypes['AppointmentTime']> = ResolversObject<{
  start: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  duration: Resolver<Maybe<ResolversTypes['Duration']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AppointmentsConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AppointmentsConnection'] = ResolversParentTypes['AppointmentsConnection']> = ResolversObject<{
  pageInfo: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['AppointmentEdge']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CheckupResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Checkup'] = ResolversParentTypes['Checkup']> = ResolversObject<{
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isRead: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  services: Resolver<ReadonlyArray<ResolversTypes['Service']>, ParentType, ContextType>;
  suggestedDate: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DoctorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Doctor'] = ResolversParentTypes['Doctor']> = ResolversObject<{
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  firstname: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastname: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  specialities: Resolver<ReadonlyArray<ResolversTypes['String']>, ParentType, ContextType>;
  address: Resolver<ResolversTypes['Address'], ParentType, ContextType>;
  offeredSlots: Resolver<ReadonlyArray<ResolversTypes['OfferedSlot']>, ParentType, ContextType>;
  rating: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  topServices: Resolver<ReadonlyArray<ResolversTypes['Service']>, ParentType, ContextType>;
  topReviews: Resolver<ReadonlyArray<ResolversTypes['Review']>, ParentType, ContextType>;
  webpage: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DoctorEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['DoctorEdge'] = ResolversParentTypes['DoctorEdge']> = ResolversObject<{
  cursor: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node: Resolver<Maybe<ResolversTypes['Doctor']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DoctorsConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['DoctorsConnection'] = ResolversParentTypes['DoctorsConnection']> = ResolversObject<{
  pageInfo: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['DoctorEdge']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DurationScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Duration'], any> {
  name: 'Duration';
}

export type FollowupResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Followup'] = ResolversParentTypes['Followup']> = ResolversObject<{
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isRead: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  doctor: Resolver<ResolversTypes['Doctor'], ParentType, ContextType>;
  services: Resolver<ReadonlyArray<ResolversTypes['Service']>, ParentType, ContextType>;
  suggestedDate: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GenderResolvers = EnumResolverSignature<{ Male: any, Female: any, TransgenderMale: any, TransgenderFemale: any, NonBinary: any }, ResolversTypes['Gender']>;

export type InsuranceResolvers = EnumResolverSignature<{ Public: any, Private: any }, ResolversTypes['Insurance']>;

export interface LengthScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Length'], any> {
  name: 'Length';
}

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createUserDoctor: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserDoctorArgs, 'input'>>;
  deleteAppointmentById: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteAppointmentByIdArgs, 'id'>>;
  makeAppointmentAsDone: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationMakeAppointmentAsDoneArgs, 'id'>>;
  assignFollowup: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationAssignFollowupArgs, 'followupInput'>>;
  createUserPatient: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserPatientArgs, 'input'>>;
}>;

export type NodeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Appointment' | 'Checkup' | 'Doctor' | 'Followup' | 'Patient' | 'Review' | 'Search' | 'Service' | 'User', ParentType, ContextType>;
}>;

export type OfferedSlotResolvers<ContextType = Context, ParentType extends ResolversParentTypes['OfferedSlot'] = ResolversParentTypes['OfferedSlot']> = ResolversObject<{
  day: Resolver<ResolversTypes['Weekday'], ParentType, ContextType>;
  start: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  end: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PageInfoResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  hasNextPage: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endCursor: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PatientResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Patient'] = ResolversParentTypes['Patient']> = ResolversObject<{
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  firstname: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastname: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  activityLevel: Resolver<Maybe<ResolversTypes['ActivityLevel']>, ParentType, ContextType>;
  gender: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  height: Resolver<Maybe<ResolversTypes['Length']>, ParentType, ContextType>;
  weight: Resolver<Maybe<ResolversTypes['Weight']>, ParentType, ContextType>;
  medications: Resolver<ReadonlyArray<ResolversTypes['String']>, ParentType, ContextType>;
  medicalConditions: Resolver<ReadonlyArray<ResolversTypes['String']>, ParentType, ContextType>;
  allergies: Resolver<ReadonlyArray<ResolversTypes['String']>, ParentType, ContextType>;
  surgeries: Resolver<ReadonlyArray<ResolversTypes['String']>, ParentType, ContextType>;
  isSmoker: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PatientEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PatientEdge'] = ResolversParentTypes['PatientEdge']> = ResolversObject<{
  cursor: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node: Resolver<Maybe<ResolversTypes['Patient']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PatientsConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PatientsConnection'] = ResolversParentTypes['PatientsConnection']> = ResolversObject<{
  pageInfo: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['PatientEdge']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  greeting: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  me: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  node: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType, RequireFields<QueryNodeArgs, 'id'>>;
  search: Resolver<ResolversTypes['Search'], ParentType, ContextType, RequireFields<QuerySearchArgs, never>>;
  appointments: Resolver<ReadonlyArray<ResolversTypes['Appointment']>, ParentType, ContextType, RequireFields<QueryAppointmentsArgs, 'doctorId'>>;
  users: Resolver<ResolversTypes['UsersConnection'], ParentType, ContextType, RequireFields<QueryUsersArgs, never>>;
  patients: Resolver<ResolversTypes['PatientsConnection'], ParentType, ContextType, RequireFields<QueryPatientsArgs, never>>;
  doctors: Resolver<ResolversTypes['DoctorsConnection'], ParentType, ContextType, RequireFields<QueryDoctorsArgs, never>>;
  reviews: Resolver<ResolversTypes['ReviewsConnection'], ParentType, ContextType, RequireFields<QueryReviewsArgs, never>>;
  services: Resolver<ResolversTypes['ServicesConnection'], ParentType, ContextType, RequireFields<QueryServicesArgs, never>>;
  latestReviews: Resolver<ReadonlyArray<ResolversTypes['Review']>, ParentType, ContextType>;
}>;

export type ReviewResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = ResolversObject<{
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  rating: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  doctor: Resolver<ResolversTypes['Doctor'], ParentType, ContextType>;
  patient: Resolver<ResolversTypes['Patient'], ParentType, ContextType>;
  content: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ReviewEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ReviewEdge'] = ResolversParentTypes['ReviewEdge']> = ResolversObject<{
  cursor: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node: Resolver<Maybe<ResolversTypes['Review']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ReviewsConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ReviewsConnection'] = ResolversParentTypes['ReviewsConnection']> = ResolversObject<{
  pageInfo: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['ReviewEdge']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SearchResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Search'] = ResolversParentTypes['Search']> = ResolversObject<{
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  scope: Resolver<ResolversTypes['SearchScope'], ParentType, ContextType>;
  suggestions: Resolver<ResolversTypes['SearchSuggestions'], ParentType, ContextType>;
  results: Resolver<ResolversTypes['DoctorsConnection'], ParentType, ContextType, RequireFields<SearchResultsArgs, never>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SearchScopeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SearchScope'] = ResolversParentTypes['SearchScope']> = ResolversObject<{
  query: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  specialities: Resolver<Maybe<ReadonlyArray<ResolversTypes['String']>>, ParentType, ContextType>;
  cities: Resolver<Maybe<ReadonlyArray<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SearchSuggestionsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SearchSuggestions'] = ResolversParentTypes['SearchSuggestions']> = ResolversObject<{
  specialities: Resolver<Maybe<ReadonlyArray<ResolversTypes['String']>>, ParentType, ContextType>;
  cities: Resolver<Maybe<ReadonlyArray<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ServiceResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Service'] = ResolversParentTypes['Service']> = ResolversObject<{
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ServiceEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ServiceEdge'] = ResolversParentTypes['ServiceEdge']> = ResolversObject<{
  cursor: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node: Resolver<Maybe<ResolversTypes['Service']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ServicesConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ServicesConnection'] = ResolversParentTypes['ServicesConnection']> = ResolversObject<{
  pageInfo: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['ServiceEdge']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL';
}

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  firstname: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastname: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  doctorProfile: Resolver<Maybe<ResolversTypes['Doctor']>, ParentType, ContextType>;
  patientProfile: Resolver<Maybe<ResolversTypes['Patient']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UserEdge'] = ResolversParentTypes['UserEdge']> = ResolversObject<{
  cursor: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UsersConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UsersConnection'] = ResolversParentTypes['UsersConnection']> = ResolversObject<{
  pageInfo: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges: Resolver<Maybe<ReadonlyArray<Maybe<ResolversTypes['UserEdge']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WeekdayResolvers = EnumResolverSignature<{ Monday: any, Tuesday: any, Wednesday: any, Thursday: any, Friday: any, Saturday: any, Sunday: any }, ResolversTypes['Weekday']>;

export interface WeightScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Weight'], any> {
  name: 'Weight';
}

export type Resolvers<ContextType = Context> = ResolversObject<{
  ActivityLevel: ActivityLevelResolvers;
  Address: AddressResolvers<ContextType>;
  Appointment: AppointmentResolvers<ContextType>;
  AppointmentEdge: AppointmentEdgeResolvers<ContextType>;
  AppointmentTime: AppointmentTimeResolvers<ContextType>;
  AppointmentsConnection: AppointmentsConnectionResolvers<ContextType>;
  Checkup: CheckupResolvers<ContextType>;
  DateTime: GraphQLScalarType;
  Doctor: DoctorResolvers<ContextType>;
  DoctorEdge: DoctorEdgeResolvers<ContextType>;
  DoctorsConnection: DoctorsConnectionResolvers<ContextType>;
  Duration: GraphQLScalarType;
  Followup: FollowupResolvers<ContextType>;
  Gender: GenderResolvers;
  Insurance: InsuranceResolvers;
  Length: GraphQLScalarType;
  Mutation: MutationResolvers<ContextType>;
  Node: NodeResolvers<ContextType>;
  OfferedSlot: OfferedSlotResolvers<ContextType>;
  PageInfo: PageInfoResolvers<ContextType>;
  Patient: PatientResolvers<ContextType>;
  PatientEdge: PatientEdgeResolvers<ContextType>;
  PatientsConnection: PatientsConnectionResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
  Review: ReviewResolvers<ContextType>;
  ReviewEdge: ReviewEdgeResolvers<ContextType>;
  ReviewsConnection: ReviewsConnectionResolvers<ContextType>;
  Search: SearchResolvers<ContextType>;
  SearchScope: SearchScopeResolvers<ContextType>;
  SearchSuggestions: SearchSuggestionsResolvers<ContextType>;
  Service: ServiceResolvers<ContextType>;
  ServiceEdge: ServiceEdgeResolvers<ContextType>;
  ServicesConnection: ServicesConnectionResolvers<ContextType>;
  URL: GraphQLScalarType;
  User: UserResolvers<ContextType>;
  UserEdge: UserEdgeResolvers<ContextType>;
  UsersConnection: UsersConnectionResolvers<ContextType>;
  Weekday: WeekdayResolvers;
  Weight: GraphQLScalarType;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
