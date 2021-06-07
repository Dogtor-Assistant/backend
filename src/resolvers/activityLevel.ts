import type { ActivityLevelResolvers } from '@resolvers';

import { ActivityLevel as ActivityLevelEnum } from 'models/Patient';

const ActivityLevel: ActivityLevelResolvers = {
    High: ActivityLevelEnum.HIGH,
    Low: ActivityLevelEnum.LOW,
    Medium: ActivityLevelEnum.MEDIUM,
    VeryHigh: ActivityLevelEnum.VERY_HIGH,
    VeryLow: ActivityLevelEnum.VERY_LOW,
};

export default ActivityLevel;
