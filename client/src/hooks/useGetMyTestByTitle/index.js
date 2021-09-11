import { useLazyQuery } from "@apollo/react-hooks";
import { loader } from "graphql.macro";

const queryGetMyTestByTitle = loader("./gql/useGetMyTestByTitle.graphql");

export const useGetMyTestByTitle = () => {
  const [_getMyTestByTitle, { loading, data }] = useLazyQuery(
    queryGetMyTestByTitle,
    {
      fetchPolicy: "no-cache",
    }
  );

  const getMyTestByTitle = async (title) => {
    await _getMyTestByTitle({
      variables: {
        title,
      },
    });
  };

  return {
    getMyTestByTitle,
    loading,
    testByTitle: data && data.getMyTestByTitle,
  };
};
