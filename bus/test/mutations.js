//Core
import { ApolloError } from "apollo-server-errors";

//Model
import {
  createTest,
  updateTest,
  deleteTest,
  likeTest,
} from "./model/testModel.js";

export const mutations = {
  createTest: async (_, { createTestInput }, { req }) => {
    try {
      const test = await createTest(createTestInput, req);
      return test;
    } catch (e) {
      throw new ApolloError(e.message);
    }
  },
  updateTest: async (_, { updateTestInput, title }, { req }) => {
    try {
      const test = await updateTest(updateTestInput, title, req);
      return test;
    } catch (e) {
      throw new ApolloError(e.message);
    }
  },
  likeTest: async (_, { title }, { req }) => {
    try {
      const allLikes = await likeTest(title, req);
      return allLikes;
    } catch (e) {
      throw new ApolloError(e.message);
    }
  },
  deleteTest: async (_, { title }, { req }) => {
    try {
      const test = await deleteTest(title, req);
      return test;
    } catch (e) {
      throw new ApolloError(e.message);
    }
  },
};
