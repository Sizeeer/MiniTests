//Core
import { AuthenticationError } from "apollo-server";
import jwt from "jsonwebtoken";

//Other
import { env } from "./env";

export const authenticate = (req) => {
  const { token } = req.session;

  if (!token) {
    throw new AuthenticationError("У вас нет токена");
  }

  const { id } = jwt.verify(token, env.USER_SECRET);

  if (!id) {
    throw new AuthenticationError("Вы не авторизованы");
  }

  return id;
};

export const deleteCookie = (req) => {
  req.session.cookie.maxAge = 0;
  req.session.token = null;
};

export const setCookie = (id, req) => {
  req.session.token = jwt.sign({ id }, env.USER_SECRET);
};
