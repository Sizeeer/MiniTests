import { useLazyQuery } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
import { useCallback, useEffect, useState } from "react";
import { useLogin } from "../useLogin";
import Cookie from "js-cookie";

const queryAuth = loader("./gql/auth.graphql");

export const useIsAuth = () => {
  const [checkAuth, { data, loading }] = useLazyQuery(queryAuth);

  return {
    loading,
    isAuth: data && data.isAuth,
    checkAuth,
  };
};
