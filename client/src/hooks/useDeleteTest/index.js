import { useMutation } from "@apollo/react-hooks";
import { loader } from "graphql.macro";

const mutationDeleteTask = loader("./gql/useDeleteTest.graphql");

export const useDeleteTest = () => {
  const [_deleteTest, { loading, data }] = useMutation(mutationDeleteTask);

  const deleteTest = async (title) => {
    await _deleteTest({
      variables: {
        title,
      },
    });
  };

  return {
    deleteTest,
    loading,
    deletedTest: data && data.deleteTest,
  };
};
