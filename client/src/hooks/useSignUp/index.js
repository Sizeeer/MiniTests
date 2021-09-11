import { useMutation } from "@apollo/react-hooks";
import { loader } from "graphql.macro";

const mutationSignUp = loader("./gql/useSignUp.graphql");

export const useSignUp = () => {
  const [_signUp, { loading, data }] = useMutation(mutationSignUp);

  const signUp = async (variables) => {
    await _signUp({
      variables: {
        signUpInput: variables,
      },
    });
  };

  return {
    signUp,
    loading,
    user: data && data.signUp,
  };
};
