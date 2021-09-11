import { events } from "../../init/events.js";
import { pubSub } from "../../init/pubSub.js";

export const subscriptions = {
  testUpdated: {
    subscribe: () => pubSub.asyncIterator([events.TEST_UPDATED]),
  },
};
