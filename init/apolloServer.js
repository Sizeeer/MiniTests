//Core
import express from "express";
import { ApolloServer } from "apollo-server-express";

//Resolvers
import { resolvers } from "./resolvers.js";

//Schema
import schema from "./types.graphql";
import session from "express-session";
import { corsOptions, sessionOptions } from "./serverConfig.js";
import cors from "cors";
const path = require("path");
const app = express();
app.use(express.json({ extended: true }));
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});
app.use("/*", express.static(__dirname + "/public"));

app.use(session(sessionOptions));
app.use(cors(corsOptions));
app.set("etag", false);

app.get("/isAuth", (req, res) => {
  const token = req.session.token;
  res.json({ token });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
}

const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers,
  // subscriptions: {
  //   path: "/subscriptions",
  // },
  context: ({ req, res }) => {
    return { req, res };
  },
  playground: {
    settings: {
      "request.credentials": "include",
    },
  },
});

const { graphqlPath, subscriptionsPath } = apolloServer;

apolloServer.applyMiddleware({ app, cors: false });

export { apolloServer, app, graphqlPath, subscriptionsPath };
