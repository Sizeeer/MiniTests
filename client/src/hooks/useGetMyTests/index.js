import { useQuery } from "@apollo/react-hooks";
import { getOperationName } from "apollo-link";
import { loader } from "graphql.macro";

const queryGetMyTests = loader("./gql/useGetMyTests.graphql");

export const useMyGetTests = () => {
  const { loading, data, fetchMore, refetch } = useQuery(queryGetMyTests, {
    variables: {
      currentPage: null,
      limits: 4,
    },
    refetchQueries: [getOperationName(queryGetMyTests)],
    fetchPolicy: "network-only",
  });

  return {
    loading,
    myTests: data && data.getMyTests.tests,
    currentPage: data && data.getMyTests.currentPage,
    totalTests: data && data.getMyTests.totalTests,
    fetchMore,
    refetch,
  };
};
