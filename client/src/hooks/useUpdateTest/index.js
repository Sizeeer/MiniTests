import { useMutation } from "@apollo/react-hooks";
import { loader } from "graphql.macro";

const mutationUpdateTest = loader("./gql/useUpdateTest.graphql");

export const useUpdateTest = () => {
  const [_updateTest, { loading, data: mutationData }] =
    useMutation(mutationUpdateTest);

  const updateTest = async (updateTestInput, title) => {
    await _updateTest({
      variables: {
        updateTestInput,
        title,
      },
    });
  };

  return {
    updateTest,
    loading,
    updatedTest: mutationData && mutationData.updateTest,
  };
};
