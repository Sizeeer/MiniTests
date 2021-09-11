import { ApolloClient } from "apollo-client";
// import { split } from "apollo-link";
// import { WebSocketLink } from "apollo-link-ws";
// import { getMainDefinition } from "apollo-utilities";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const uri = "https://miniquizapplication.herokuapp.com/graphql";

const httpLink = createHttpLink({
  uri,
  credentials: "include",
});

// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:4000/subscriptions`,
//   options: {
//     reconnect: true,
//   },
// });

// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem("token");

//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

// const link = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === "OperationDefinition" &&
//       definition.operation === "subscription"
//     );
//   },
//   wsLink,
//   httpLink
// );

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
