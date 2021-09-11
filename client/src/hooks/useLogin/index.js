import { useMutation } from "@apollo/react-hooks";
import { loader } from "graphql.macro";

const mutationLogin = loader("./gql/useLogin.graphql");

export const useLogin = () => {
  const [_login, { loading, data }] = useMutation(mutationLogin);

  const login = async (variables) => {
    await _login({
      variables: {
        loginInput: variables,
      },
    });
  };

  return {
    login,
    loading,
    user: data && data.login,
  };
};
