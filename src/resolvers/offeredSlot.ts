import type { OfferedSlotResolvers } from '@resolvers';

const OfferedSlot: OfferedSlotResolvers = {
    day({ day }) {
        return day;
    },
    end({ end }) {
        return end;
    },
    start({ start }) {
        return start;
    },
};

export default OfferedSlot;
