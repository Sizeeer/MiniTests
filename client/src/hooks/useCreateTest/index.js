import { useMutation } from "@apollo/react-hooks";
import { loader } from "graphql.macro";

const mutationCreateTest = loader("./gql/useCreateTest.graphql");

export const useCreateTest = () => {
  const [_createTest, { loading, data }] = useMutation(mutationCreateTest);

  const createTest = async (createTestInput) => {
    await _createTest({
      variables: {
        createTestInput,
      },
    });
  };

  return {
    createTest,
    loading,
    createdTest: data && data.createTest,
  };
};
