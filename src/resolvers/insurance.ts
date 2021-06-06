import type { InsuranceResolvers } from '@resolvers';

import { Insurance as InsuranceEnum } from 'models/Appointment';

const Insurance: InsuranceResolvers = {
    Private: InsuranceEnum.PRIVATE,
    Public: InsuranceEnum.PUBLIC,
};

export default Insurance;
