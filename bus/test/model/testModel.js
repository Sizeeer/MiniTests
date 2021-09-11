//Core
import { ApolloError } from "apollo-server-errors";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

//Schema
import { Test } from "../../../mongoSchemes/test.js";
import { User } from "../../../mongoSchemes/user.js";

//Custom
import { env } from "../../../env.js";
import { pubSub } from "../../../init/pubSub.js";
import { events } from "../../../init/events.js";

export const getTests = async (currentPage, limits) => {
  const tests = await Test.find({})
    .sort({ dateOfCreating: -1 })
    .skip(Number(currentPage) * limits)
    .limit(limits);

  if (!tests) {
    throw new ApolloError("Список тестов пуст!");
  }

  const totalTests = await Test.find({});

  const returnedTests = {
    tests,
    currentPage,
    totalTests: totalTests.length,
  };

  return returnedTests;
};

export const getMyTests = async (currentPage, limits, req) => {
  const token = req.session.token;

  if (!token) {
    throw new AuthenticationError("Вы не залогинены");
  }

  const { email: jwtEmail } = jwt.verify(token, env.USER_SECRET);

  const tests = await Test.find({ owner: jwtEmail })
    .sort({ dateOfCreating: -1 })
    .skip(Number(currentPage) * limits)
    .limit(limits);

  if (!tests) {
    throw new ApolloError("Список тестов пуст!");
  }

  const totalTests = await Test.find({ owner: jwtEmail });

  const returnedTests = {
    tests,
    currentPage,
    totalTests: totalTests.length,
  };

  return returnedTests;
};

export const getTestByTitle = async (title) => {
  const test = await Test.findOne({ title });

  if (!test) {
    throw new ApolloError("Тест с таким заголовком не найден!");
  }

  return test;
};

export const getMyTestByTitle = async (title, req) => {
  const token = req.session.token;

  if (!token) {
    throw new AuthenticationError("Вы не залогинены");
  }

  const { email: jwtEmail } = jwt.verify(token, env.USER_SECRET);

  const test = await Test.findOne({ title, owner: jwtEmail });

  if (!test) {
    throw new ApolloError("Тест с таким заголовком не найден!");
  }

  return test;
};

export const createTest = async (createTestInput, req) => {
  const { title, description, questions, result } = createTestInput;

  const { token } = req.session;

  if (!token) {
    throw new AuthenticationError("Вы не залогинены");
  }

  const { email: jwtEmail } = jwt.verify(token, env.USER_SECRET);

  const newTest = {
    id: uuidv4(),
    title,
    description,
    questions,
    owner: jwtEmail,
    userId: [],
    allLikes: 0,
    result,
    dateOfCreating: new Date(),
  };
  const newTestMongo = new Test(newTest);

  await newTestMongo.save();

  return newTest;
};

export const updateTest = async (updateTestInput, currTitle, req) => {
  const { title, description, questions } = updateTestInput;

  const test = await Test.findOne({ title: currTitle });

  if (!test) {
    throw new ApolloError("Тест с таким заголовком не найден!");
  }

  const newTest = {
    id: test.id,
    title: title || test.title,
    description: description || test.description,
    questions: questions || test.questions,
    owner: test.owner,
    userId: test.userId,
    allLikes: test.allLikes,
  };

  await Test.updateOne({ title: currTitle }, newTest);

  pubSub.publish(events.TEST_UPDATED, { testUpdated: newTest });

  return newTest;
};

export const likeTest = async (currTitle, req) => {
  const test = await Test.findOne({ title: currTitle });

  if (!test) {
    throw new ApolloError("Тест с таким заголовком не найден!");
  }

  const { token } = req.session;

  if (!token) {
    throw new AuthenticationError("Вы не залогинены");
  }

  const { email: jwtEmail } = jwt.verify(token, env.USER_SECRET);

  const user = await User.findOne({ email: jwtEmail });
  const currentUserId = user.id;

  const allLikes =
    test.userId.indexOf(currentUserId) === -1
      ? test.allLikes + 1
      : test.allLikes - 1;

  const userId =
    test.userId.indexOf(currentUserId) === -1
      ? [...test.userId, currentUserId]
      : test.userId.filter((el) => el !== currentUserId);

  const newTest = {
    id: test.id,
    title: test.title,
    description: test.description,
    questions: test.questions,
    owner: test.owner,
    userId,
    allLikes,
  };

  await Test.updateOne({ title: currTitle }, newTest);

  return { allLikes };
};

export const deleteTest = async (title, req) => {
  const test = await Test.findOne({ title });

  if (!test) {
    throw new ApolloError("Тест с таким заголовком не найден!");
  }

  const token = req.session.token;

  if (!token) {
    throw new AuthenticationError("Вы не залогинены");
  }

  const { email: jwtEmail } = jwt.verify(token, env.USER_SECRET);

  if (test.owner !== jwtEmail) {
    throw new ApolloError(
      "Вы не владелец данного теста. Вы не можете его удалить!"
    );
  }
  await Test.deleteOne({ title });

  return test;
};
