//Core
import mongoose from "mongoose";

//Server
import { server } from "./init/server.js";
import { graphqlPath, subscriptionsPath } from "./init/apolloServer.js";

//Other
import { env } from "./env.js";

const PORT = process.env.PORT || env.PORT;

const start = async () => {
  await mongoose.connect(
    "mongodb+srv://sizzzer:12345@tests.kxjh4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  );
  server.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${env.PORT}${graphqlPath}`
    );
    console.log(
      `🚀 Subscriptions ready at ws://localhost:${env.PORT}${subscriptionsPath}`
    );
  });
};

start();
