export const splitApolloError = (error) => {
  if (typeof error === "string") {
    return error;
  } else {
    const { 1: errorMessage } = error.message.split("GraphQL error: ");
    return errorMessage;
  }
};
