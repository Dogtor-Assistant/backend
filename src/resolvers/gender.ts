import type { GenderResolvers } from '@resolvers';

import { Gender as GenderEnum } from 'models/Patient';

const Gender: GenderResolvers = {
    Female: GenderEnum.FEMALE,
    Male: GenderEnum.MALE,
    NonBinary: GenderEnum.NON_BINARY,
    TransgenderFemale: GenderEnum.TRANSGENDER_FEMALE,
    TransgenderMale: GenderEnum.TRANSGENDER_MALE,
};

export default Gender;
