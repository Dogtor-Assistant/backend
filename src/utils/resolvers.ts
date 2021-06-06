/* eslint-disable */
import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { Context } from 'context';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Length: any;
  Time: any;
  TimeInterval: any;
  URL: any;
  Weight: any;
};

export enum ActivityLevel {
  VeryHigh = 'VeryHigh',
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
  VeryLow = 'VeryLow'
}

export type Address = {
  readonly __typename: 'Address';
  readonly streetName: Scalars['String'];
  readonly streetNumber: Scalars['String'];
  readonly city: Scalars['String'];
  readonly zipCode: Scalars['String'];
};

export type Appointment = Node & {
  readonly __typename: 'Appointment';
  readonly id: Scalars['ID'];
  readonly patient: Patient;
  readonly doctor: Doctor;
  readonly expectedTime: AppointmentTime;
  readonly actualTime: Maybe<AppointmentTime>;
  readonly insurance: Insurance;
  readonly notes: Maybe<Scalars['String']>;
  readonly sharedData: Scalars['Boolean'];
  readonly selectedServices: ReadonlyArray<Service>;
};

export type AppointmentTime = {
  readonly __typename: 'AppointmentTime';
  readonly start: Maybe<Scalars['DateTime']>;
  readonly duration: Maybe<Scalars['TimeInterval']>;
};

export type Checkup = Node & {
  readonly __typename: 'Checkup';
  readonly id: Scalars['ID'];
  readonly isRead: Scalars['Boolean'];
  readonly services: ReadonlyArray<Service>;
  readonly suggestedDate: Scalars['DateTime'];
};


export type Doctor = Node & {
  readonly __typename: 'Doctor';
  readonly id: Scalars['ID'];
  readonly firstname: Scalars['String'];
  readonly lastname: Scalars['String'];
  readonly specialty: Scalars['String'];
  readonly address: Address;
  readonly offeredSlots: ReadonlyArray<OfferedSlot>;
  readonly rating: Scalars['Float'];
  readonly topServices: ReadonlyArray<Service>;
  readonly topReviews: ReadonlyArray<Review>;
  readonly webpage: Maybe<Scalars['URL']>;
};

export type Followup = Node & {
  readonly __typename: 'Followup';
  readonly id: Scalars['ID'];
  readonly isRead: Scalars['Boolean'];
  readonly doctor: Doctor;
  readonly services: ReadonlyArray<Service>;
  readonly suggestedDate: Scalars['DateTime'];
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


export type Node = {
  readonly id: Scalars['ID'];
};

export type OfferedSlot = {
  readonly __typename: 'OfferedSlot';
  readonly day: Weekday;
  readonly start: Scalars['Time'];
  readonly end: Scalars['Time'];
};

export type Patient = Node & {
  readonly __typename: 'Patient';
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

export type Query = {
  readonly __typename: 'Query';
  readonly greeting: Scalars['String'];
  readonly me: Maybe<User>;
  readonly node: Maybe<Node>;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};

export type Review = Node & {
  readonly __typename: 'Review';
  readonly id: Scalars['ID'];
  readonly rating: Scalars['Int'];
  readonly doctor: Doctor;
  readonly patient: Doctor;
  readonly content: Maybe<Scalars['String']>;
};

export type Service = Node & {
  readonly __typename: 'Service';
  readonly id: Scalars['ID'];
};




export type User = Node & {
  readonly __typename: 'User';
  readonly id: Scalars['ID'];
  readonly firstname: Scalars['String'];
  readonly lastname: Scalars['String'];
  readonly doctorProfile: Maybe<Doctor>;
  readonly patientProfile: Maybe<Patient>;
};

export enum Weekday {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday'
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
  ActivityLevel: ActivityLevel;
  Address: ResolverTypeWrapper<Address>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Appointment: ResolverTypeWrapper<Appointment>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  AppointmentTime: ResolverTypeWrapper<AppointmentTime>;
  Checkup: ResolverTypeWrapper<Checkup>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Doctor: ResolverTypeWrapper<Doctor>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Followup: ResolverTypeWrapper<Followup>;
  Gender: Gender;
  Insurance: Insurance;
  Length: ResolverTypeWrapper<Scalars['Length']>;
  Node: ResolversTypes['Appointment'] | ResolversTypes['Checkup'] | ResolversTypes['Doctor'] | ResolversTypes['Followup'] | ResolversTypes['Patient'] | ResolversTypes['Review'] | ResolversTypes['Service'] | ResolversTypes['User'];
  OfferedSlot: ResolverTypeWrapper<OfferedSlot>;
  Patient: ResolverTypeWrapper<Patient>;
  Query: ResolverTypeWrapper<{}>;
  Review: ResolverTypeWrapper<Review>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Service: ResolverTypeWrapper<Service>;
  Time: ResolverTypeWrapper<Scalars['Time']>;
  TimeInterval: ResolverTypeWrapper<Scalars['TimeInterval']>;
  URL: ResolverTypeWrapper<Scalars['URL']>;
  User: ResolverTypeWrapper<User>;
  Weekday: Weekday;
  Weight: ResolverTypeWrapper<Scalars['Weight']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Address: Address;
  String: Scalars['String'];
  Appointment: Appointment;
  ID: Scalars['ID'];
  Boolean: Scalars['Boolean'];
  AppointmentTime: AppointmentTime;
  Checkup: Checkup;
  DateTime: Scalars['DateTime'];
  Doctor: Doctor;
  Float: Scalars['Float'];
  Followup: Followup;
  Length: Scalars['Length'];
  Node: ResolversParentTypes['Appointment'] | ResolversParentTypes['Checkup'] | ResolversParentTypes['Doctor'] | ResolversParentTypes['Followup'] | ResolversParentTypes['Patient'] | ResolversParentTypes['Review'] | ResolversParentTypes['Service'] | ResolversParentTypes['User'];
  OfferedSlot: OfferedSlot;
  Patient: Patient;
  Query: {};
  Review: Review;
  Int: Scalars['Int'];
  Service: Service;
  Time: Scalars['Time'];
  TimeInterval: Scalars['TimeInterval'];
  URL: Scalars['URL'];
  User: User;
  Weight: Scalars['Weight'];
}>;

export type AddressResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = ResolversObject<{
  streetName: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  streetNumber: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  city: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  zipCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AppointmentTimeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AppointmentTime'] = ResolversParentTypes['AppointmentTime']> = ResolversObject<{
  start: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  duration: Resolver<Maybe<ResolversTypes['TimeInterval']>, ParentType, ContextType>;
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
  specialty: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address: Resolver<ResolversTypes['Address'], ParentType, ContextType>;
  offeredSlots: Resolver<ReadonlyArray<ResolversTypes['OfferedSlot']>, ParentType, ContextType>;
  rating: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  topServices: Resolver<ReadonlyArray<ResolversTypes['Service']>, ParentType, ContextType>;
  topReviews: Resolver<ReadonlyArray<ResolversTypes['Review']>, ParentType, ContextType>;
  webpage: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FollowupResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Followup'] = ResolversParentTypes['Followup']> = ResolversObject<{
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isRead: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  doctor: Resolver<ResolversTypes['Doctor'], ParentType, ContextType>;
  services: Resolver<ReadonlyArray<ResolversTypes['Service']>, ParentType, ContextType>;
  suggestedDate: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface LengthScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Length'], any> {
  name: 'Length';
}

export type NodeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Appointment' | 'Checkup' | 'Doctor' | 'Followup' | 'Patient' | 'Review' | 'Service' | 'User', ParentType, ContextType>;
}>;

export type OfferedSlotResolvers<ContextType = Context, ParentType extends ResolversParentTypes['OfferedSlot'] = ResolversParentTypes['OfferedSlot']> = ResolversObject<{
  day: Resolver<ResolversTypes['Weekday'], ParentType, ContextType>;
  start: Resolver<ResolversTypes['Time'], ParentType, ContextType>;
  end: Resolver<ResolversTypes['Time'], ParentType, ContextType>;
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

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  greeting: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  me: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  node: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType, RequireFields<QueryNodeArgs, 'id'>>;
}>;

export type ReviewResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = ResolversObject<{
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  rating: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  doctor: Resolver<ResolversTypes['Doctor'], ParentType, ContextType>;
  patient: Resolver<ResolversTypes['Doctor'], ParentType, ContextType>;
  content: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ServiceResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Service'] = ResolversParentTypes['Service']> = ResolversObject<{
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export interface TimeIntervalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['TimeInterval'], any> {
  name: 'TimeInterval';
}

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

export interface WeightScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Weight'], any> {
  name: 'Weight';
}

export type Resolvers<ContextType = Context> = ResolversObject<{
  Address: AddressResolvers<ContextType>;
  Appointment: AppointmentResolvers<ContextType>;
  AppointmentTime: AppointmentTimeResolvers<ContextType>;
  Checkup: CheckupResolvers<ContextType>;
  DateTime: GraphQLScalarType;
  Doctor: DoctorResolvers<ContextType>;
  Followup: FollowupResolvers<ContextType>;
  Length: GraphQLScalarType;
  Node: NodeResolvers<ContextType>;
  OfferedSlot: OfferedSlotResolvers<ContextType>;
  Patient: PatientResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
  Review: ReviewResolvers<ContextType>;
  Service: ServiceResolvers<ContextType>;
  Time: GraphQLScalarType;
  TimeInterval: GraphQLScalarType;
  URL: GraphQLScalarType;
  User: UserResolvers<ContextType>;
  Weight: GraphQLScalarType;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
