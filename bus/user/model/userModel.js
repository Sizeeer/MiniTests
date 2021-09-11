//Core
const bcrypt = require("bcrypt");
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { AuthenticationError } from "apollo-server-express";

//Schema
import { User } from "../../../mongoSchemes/user.js";

//Custom
import { env } from "./../../../env.js";

//Queries
export const getProfileInfo = async (req) => {
  const { token } = req.session;

  if (!token) {
    throw new AuthenticationError("Вы не залогинены");
  }

  const { email: jwtEmail } = jwt.verify(token, env.USER_SECRET);

  const user = await User.findOne({ email: jwtEmail });

  if (!user) {
    throw new AuthenticationError("Вы не залогинены");
  }

  return user;
};

export const isAuth = async (req) => {
  const token = req.session.token;

  return !!token;
};

//Mutations
export const login = async (loginInput, req) => {
  const { email, password } = loginInput;
  const user = await User.findOne({ email });

  if (!user) {
    throw new AuthenticationError("Неверно введен email или пароль");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new AuthenticationError("Неверно введен email или пароль");
  }

  const token = jwt.sign({ email: loginInput.email }, env.USER_SECRET);

  req.session.token = token;

  return user;
};
export const logout = async (req) => {
  const { token } = req.session;

  if (!token) {
    throw new AuthenticationError("Вы не залогинены");
  }

  const { email: jwtEmail } = jwt.verify(token, env.USER_SECRET);

  const user = await User.findOne({ email: jwtEmail });

  if (!user) {
    throw new AuthenticationError("Вы не залогинены");
  }

  req.session.cookie.maxAge = 0;

  return user;
};
export const signUp = async (signUpInput) => {
  const { email, password, firstName, lastName } = signUpInput;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = {
    id: uuidv4(),
    email,
    firstName,
    lastName,
    password: hashedPassword,
  };

  const NewUser = new User(newUser);

  await NewUser.save();

  return newUser;
};
export const changeProfile = async (userInput, req) => {
  const { firstName, lastName, email, password } = userInput;

  const salt = await bcrypt.genSalt(10);

  if (password) {
    password = await bcrypt.hash(password, salt);
  }

  const { token } = req.session;

  if (!token) {
    throw new AuthenticationError("Вы не залогинены");
  }

  const { email: jwtEmail } = jwt.verify(token, env.USER_SECRET);

  const user = await User.findOne({ email: jwtEmail });

  if (!user) {
    throw new AuthenticationError("Вы не залогинены");
  }

  const newUser = {
    id: uuidv4(),
    firstName: firstName || user.firstName,
    lastName: lastName || user.lastName,
    email: email || user.email,
    password: password || user.password,
  };

  await User.updateOne({ email: jwtEmail }, newUser);

  const newToken = jwt.sign({ email }, env.USER_SECRET);

  req.session.token = newToken;

  return newUser;
};
