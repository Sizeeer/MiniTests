//Core
import { ApolloError } from "apollo-server-errors";

//Model
import { changeProfile, login, logout, signUp } from "./model/userModel.js";

export const mutations = {
  login: async (_, { loginInput }, { req }) => {
    try {
      const user = await login(loginInput, req);
      return user;
    } catch (e) {
      throw new ApolloError(e.message);
    }
  },
  logout: async (_, __, { req }) => {
    try {
      const user = await logout(req);
      return user;
    } catch (e) {
      throw new ApolloError(e.message);
    }
  },
  signUp: async (_, { signUpInput }, ___) => {
    try {
      const user = await signUp(signUpInput);
      return user;
    } catch (e) {
      throw new ApolloError(e.message);
    }
  },
  changeProfile: async (_, { userInput }, { req }) => {
    try {
      const user = await changeProfile(userInput, req);
      return user;
    } catch (e) {
      throw new ApolloError(e.message);
    }
  },
};
