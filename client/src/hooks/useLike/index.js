import { useMutation } from "@apollo/react-hooks";
import { loader } from "graphql.macro";

const mutationLike = loader("./gql/like.graphql");

export const useLike = () => {
  const [_like, { data }] = useMutation(mutationLike);

  const like = async (title) => {
    await _like({
      variables: {
        title,
      },
    });
  };
  return {
    like,
    allLikes: data && data.allLikes,
  };
};
