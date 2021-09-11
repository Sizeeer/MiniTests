import { ApolloError } from "apollo-server-errors";
import {
  getTests,
  getMyTests,
  getTestByTitle,
  getMyTestByTitle,
} from "./model/testModel.js";

export const queries = {
  getTests: async (_, { currentPage, limits }, { req }) => {
    try {
      const returnedTests = await getTests(currentPage, limits);
      return returnedTests;
    } catch (e) {
      throw new ApolloError(e.message);
    }
  },
  getMyTests: async (_, { currentPage, limits }, { req }) => {
    try {
      const tests = await getMyTests(currentPage, limits, req);
      return tests;
    } catch (e) {
      throw new ApolloError(e.message);
    }
  },
  getTestByTitle: async (_, { title }, { req }) => {
    try {
      const test = await getTestByTitle(title);
      return test;
    } catch (e) {
      throw new ApolloError(e.message);
    }
  },
  getMyTestByTitle: async (_, { title }, { req }) => {
    try {
      const test = await getMyTestByTitle(title, req);
      return test;
    } catch (e) {
      throw new ApolloError(e.message);
    }
  },
};
