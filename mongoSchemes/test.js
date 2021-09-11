//Core
import { Schema, model } from "mongoose";

const Result = new Schema({
  from: { type: Number, required: true },
  to: { type: Number, required: true },
  title: { type: String, required: true },
});

const Answer = new Schema({
  title: { type: String, required: true },
  weight: { type: Number, required: true },
});

const TestQuestion = new Schema({
  title: { type: String, required: true },
  answers: { type: [Answer], required: true },
});

const schema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true, unique: true },
  owner: { type: String, required: true },
  description: { type: String, required: true },
  questions: { type: [TestQuestion], required: true },
  userId: { type: [String] },
  allLikes: { type: Number, required: true },
  result: { type: [Result], required: true },
  dateOfCreating: { type: Date, required: true },
});

export const Test = model("Test", schema);
