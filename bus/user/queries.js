import { getProfileInfo, isAuth } from "./model/userModel.js";

export const queries = {
  getProfileInfo: async (_, __, { req }) => {
    try {
      const user = await getProfileInfo(req);
      return user;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  isAuth: async (_, __, { req }) => {
    try {
      const isAuthRes = await isAuth(req);
      return isAuthRes;
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
