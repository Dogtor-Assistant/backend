import type { WeekdayResolvers } from '@resolvers';

import { Day } from 'models/Doctor';

const Weekday: WeekdayResolvers = {
    Friday: Day.FRIDAY,
    Monday: Day.MONDAY,
    Saturday: Day.SATURDAY,
    Sunday: Day.SUNDAY,
    Thursday: Day.THURSDAY,
    Tuesday: Day.TUESDAY,
    Wednesday: Day.WEDNESDAY,
};

export default Weekday;
