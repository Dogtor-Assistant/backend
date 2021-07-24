
import type {
    ConcreteRecommendation,
    InferenceRule,
    InferenceRuleResult,
    Recommendation,
    RecommendationStrategy,
    UserMedicalData,
} from './types';
import type { IPatient } from 'models/Patient';

import defaultStrategy from './strategy';

import Appointment from 'models/Appointment';
import Checkup from 'models/Checkup';
import User from 'models/User';

function evaluateRule(rule: InferenceRule, data: UserMedicalData): InferenceRuleResult {
    if (typeof rule === 'string') {
        return rule;
    }

    if (typeof rule === 'function') {
        return rule(data);
    }

    if (typeof rule === 'object') {
        for (const innerRule of rule) {
            const result = evaluateRule(innerRule, data);
            if (result !== 'Skip') {
                return result;
            }
        }
    }

    return 'Deny';
}

function evaluateStrategy(strategy: RecommendationStrategy, data: UserMedicalData): Recommendation[] {
    if ('length' in strategy) {
        return strategy.flatMap(inner => evaluateStrategy(inner, data));
    }

    if ('kind' in strategy) {
        return [strategy];
    }

    if (evaluateRule(strategy.rule, data) === 'Show') {
        return [strategy.recommendation];
    }

    return [];
}

class RecommendationService {
    _strategy: RecommendationStrategy
    
    constructor(strategy: RecommendationStrategy = defaultStrategy) {
        this._strategy = strategy;
    }

    async recommendationsForPatient(patient: IPatient): Promise<ConcreteRecommendation[]> {
        const { _id: id, birthDate, insurance, gender, medications, medicalConditions } = patient;
        if (id && birthDate && insurance && medications && medicalConditions) {
            const dateOfBirth = new Date(birthDate);
            
            const insuranceStr: 'Public' | 'Private' = insurance === 1 ? 'Private' : 'Public';

            const genderArr: ('Male' | 'Female' | 'TransgenderMale' | 'TransgenderFemale' | 'NonBinary' | undefined)[] =
            ['Female', 'Male', 'TransgenderFemale', 'TransgenderMale', 'NonBinary'];
            
            const genderStr = gender ? genderArr[gender] : undefined;
            const userData = {
                conditions: medicalConditions,
                dateOfBirth,
                gender: genderStr,
                insurance: insuranceStr,
                medications,
            };
            
            const recommendations = this.recommendations(userData);
            const promises = recommendations.map(
                async recommendation => {
                    switch (recommendation.kind) {
                    case 'periodic': {
                        const latest = await Appointment.
                            findOne(
                                {
                                    'patientRef.patientId': id,
                                    'selectedServices.serviceName': recommendation.service,
                                },
                                null,
                                {
                                    sort: {
                                        expectedDuration: -1,
                                    },
                                },
                            );

                        if (
                            latest != null && latest.expectedTime.getTime() >= Date.now()
                        ) {
                            return null;
                        }

                        const checkup = await Checkup.findOne(
                            {
                                'patientRef.patientId': id,
                                'services': recommendation.service,
                            },
                            null,
                            {
                                sort: {
                                    suggestedDate: -1,
                                },
                            },
                        );

                        const periodInMillis = recommendation.periodInDays * 24 * 60 * 60 * 1000;

                        if (
                            checkup != null && checkup.suggestedDate.getTime() + periodInMillis >= Date.now()
                        ) {
                            return null;
                        }

                        const lastTime = latest?.expectedTime.getTime() ?? Date.now();
                        const suggestedTime = lastTime + periodInMillis;
                        const suggestedDate = new Date(suggestedTime);

                        return {
                            service: recommendation.service,
                            suggestedDate,
                        };
                    }
                            
                    case 'single': {
                        const hasHadAppointment = await Appointment.exists(
                            {
                                'patientRef.patientId': id,
                                'selectedServices.serviceName': recommendation.service,
                            },
                        );

                        if (hasHadAppointment) {
                            return null;
                        }

                        const hasCheckUpReminder = await Checkup.exists(
                            {
                                'patientRef.patientId': id,
                                'services': recommendation.service,
                            },
                        );
                        
                        if (hasCheckUpReminder) {
                            return null;
                        }

                        const suggestedTime = Date.now() + 7 * 24 * 60 * 60 * 1000;
                        const suggestedDate = new Date(suggestedTime);

                        return {
                            service: recommendation.service,
                            suggestedDate,
                        };
                    }
                    }
                },
            );

            const all = await Promise.all(promises);
            return all.compactMap(recommendation => recommendation);
        }

        return [];
    }

    async storeRemainingRecommendations(patient: IPatient) {
        const { _id, address, insurance } = patient;

        const user = await User.findOne({ patientRef: _id });
        if (user == null) return;
        const { firstName, lastName } = user;

        const recommendations = await this.recommendationsForPatient(patient);

        const newCheckups = recommendations.map(recommendation => {
            return new Checkup({
                'isRead': false,
                'patientRef': {
                    'patientAddress': address,
                    'patientId': _id,
                    'patientInsurance': insurance,
                    'patientName': `${firstName} ${lastName}`,
                },
                'services' : [recommendation.service.toString()],
                'suggestedDate' : recommendation.suggestedDate,
            });
        });

        console.log(newCheckups);

        // TODO: send email notification
        await Checkup.insertMany(newCheckups);
    }

    recommendations(data: UserMedicalData): Recommendation[] {
        const recommendations = evaluateStrategy(this._strategy, data);
        const groupped = recommendations.reduce<Record<string, Recommendation[] | undefined>>(
            (acc, recommendation) => {
                const previous = acc[recommendation.service] ?? [];
                return {
                    ...acc,
                    [recommendation.service]: [...previous, recommendation],
                };
            },
            {},
        );

        return Object.keys(groupped).map(key => {
            const recs = groupped[key] ?? [];
            return recs.reduce((lhs, rhs) => {
                if (lhs.kind === 'single') {
                    return rhs;
                }

                if (rhs.kind === 'single') {
                    return lhs;
                }

                if (lhs.periodInDays > rhs.periodInDays) {
                    return rhs;
                }

                return lhs;
            });
        });
    }
}

export default RecommendationService;
