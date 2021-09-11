import { useMutation } from "@apollo/react-hooks";
import { loader } from "graphql.macro";

const mutationLogout = loader("./gql/logout.graphql");

export const useLogout = () => {
  const [_logout] = useMutation(mutationLogout);

  const logout = async () => {
    await _logout();
  };

  return {
    logout,
  };
};
