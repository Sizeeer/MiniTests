import { useSubscription } from "@apollo/react-hooks";
import { loader } from "graphql.macro";

const subscriptionUpdateTest = loader("./gql/subUpdateTest.graphql");
const queryGetTests = loader("../useGetTests/gql/useGetTests.graphql");

export const useSubUpdateTest = () => {
  const { loading, data } = useSubscription(subscriptionUpdateTest, {
    onSubscriptionData: ({ client, subscriptionData }) => {

        const cachedTests =  client.readQuery({query: queryGetTests})
        const newTestsArr = cachedTests.getTests.map((test) => {
          if (test.id === subscriptionData.data.testUpdated.id) {
            test = subscriptionData.data.testUpdated;
          }
          return test;
        })
      cachedTests.getTests = [...newTestsArr];
      client.writeQuery({
        query: queryGetTests,
        data: cachedTests,
      });
      
  });

  return {
    loading,
    updatedTest: data && data.testUpdated,
  };
};
