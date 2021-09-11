import { useQuery } from "@apollo/react-hooks";
import { getOperationName } from "apollo-link";
import { loader } from "graphql.macro";

const queryGetProfileInfo = loader("./gql/useGetProfileInfo.graphql");

export const useGetProfileInfo = () => {
  const { loading, data } = useQuery(queryGetProfileInfo, {
    refetchQueries: [getOperationName(queryGetProfileInfo)],
    fetchPolicy: "network-only",
  });
  return {
    loading,
    profileInfo: data && data.getProfileInfo,
  };
};
