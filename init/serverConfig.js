import { env } from "../env.js";

export const sessionOptions = {
  key: "token",
  secret: env.USER_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 60000 * 60 * 24,
  },
};

export const corsOptions = {
  origin: `http://localhost:3000`,
  credentials: true,
};
