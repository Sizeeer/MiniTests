import { useLazyQuery } from "@apollo/react-hooks";
import { loader } from "graphql.macro";

const queryGetTestByTitle = loader("./gql/useGetTestByTitle.graphql");

export const useGetTestByTitle = () => {
  const [_getTestByTitle, { loading, data }] = useLazyQuery(
    queryGetTestByTitle,
    {
      fetchPolicy: "no-cache",
    }
  );

  const getTestByTitle = async (title) => {
    await _getTestByTitle({
      variables: {
        title,
      },
    });
  };

  return {
    getTestByTitle,
    loading,
    testByTitle: data && data.getTestByTitle,
  };
};
