import { useQuery } from "@apollo/react-hooks";
import { getOperationName } from "apollo-link";
import { loader } from "graphql.macro";

const queryGetTests = loader("./gql/useGetTests.graphql");

export const useGetTests = () => {
  const { loading, data, fetchMore } = useQuery(queryGetTests, {
    variables: {
      currentPage: null,
      limits: 4,
    },
    refetchQueries: [getOperationName(queryGetTests)],
    fetchPolicy: "network-only",
  });
  return {
    loading,
    tests: data && data.getTests.tests,
    currentPage: data && data.getTests.currentPage,
    totalTests: data && data.getTests.totalTests,
    fetchMore,
  };
};
