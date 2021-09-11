//Queries
import { queries as UserQueries } from "../bus/user/queries.js";
import { queries as TestQueries } from "../bus/test/queries.js";

//Mutations
import { mutations as UserMutations } from "../bus/user/mutations.js";
import { mutations as TestMutations } from "../bus/test/mutations.js";

//Subscriptions
import { subscriptions as TestSubscriptions } from "../bus/test/subscriptions.js";

export const resolvers = {
  Query: {
    ...UserQueries,
    ...TestQueries,
  },
  Mutation: {
    ...UserMutations,
    ...TestMutations,
  },
  Subscription: {
    ...TestSubscriptions,
  },
};
