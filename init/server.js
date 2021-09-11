import http from "http";
import { app, apolloServer } from "./apolloServer.js";

const server = http.createServer(app);
// apolloServer.installSubscriptionHandlers(server);

export { server };
