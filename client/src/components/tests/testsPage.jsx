//Core
import React, { lazy, useEffect, useState } from "react";

//Hooks
import { useGetTests } from "../../hooks/useGetTests";
import { useGetProfileInfo } from "../../hooks/useGetProfileInfo";
import { useGetTestByTitle } from "../../hooks/useGetTestByTitle";
import { CardDeck, Container } from "react-bootstrap";
import { SearchComponent } from "../common/SearchComponent";
import { NotTests } from "../common/NotTests";
import { Suspense } from "react";
import Loader from "../common/Loader";

//Components
const Test = lazy(() => import("../common/Test"));
const Header = lazy(() => import("../header/Header"));
// import PaginationCustom from "../common/Pagination";
const PaginationCustom = lazy(() => import("../common/Pagination"));

const TestsPage = () => {
  const { profileInfo } = useGetProfileInfo();
  const {
    tests: dbTests,
    totalTests: dbTotalTests,
    fetchMore,
    loading: testsLoading,
  } = useGetTests();

  const {
    getTestByTitle,
    testByTitle,
    loading: testByTitleLoading,
  } = useGetTestByTitle();

  const [tests, setTests] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState([]);

  const [visiblePagination, setVisiblePagination] = useState(false);

  useEffect(() => {
    if (testByTitle) {
      setTests([testByTitle]);
      setVisiblePagination(false);
    }

    return () => {
      setTests([]);
      setVisiblePagination(false);
    };
  }, [testByTitle]);

  useEffect(() => {
    if (dbTests) {
      setTests(dbTests);
      setVisiblePagination(true);
    }
    return () => {
      setTests([]);
      setVisiblePagination(false);
    };
  }, [dbTests]);

  useEffect(() => {
    if (dbTotalTests) {
      let newArrPages = [];
      for (let i = 0; i < dbTotalTests / 4; i++) {
        newArrPages.push(i + 1);
      }
      setTotalPages(newArrPages);
    }

    return () => {
      setTotalPages([]);
    };
  }, [dbTotalTests]);

  const fetchNewPosts = async (page) => {
    fetchMore({
      variables: { currentPage: page - 1, limits: 4 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return fetchMoreResult;
      },
    });

    setCurrentPage(page);
  };

  const refetchPosts = () => {
    setTests(dbTests);
    setVisiblePagination(true);
  };

  const loading = testsLoading || testByTitleLoading;

  return (
    <Suspense fallback={<Loader />}>
      <Container
        className="p-0"
        style={{
          maxWidth: 1360,
          height: "calc(100vh - 103px)",
        }}
      >
        <Header />
        <div style={{ marginTop: 103 }}>
          <SearchComponent
            getTestByTitle={getTestByTitle}
            refetchPosts={refetchPosts}
            lg={3}
          />
          <CardDeck
            className="flex-wrap flex-row"
            style={{
              marginBottom: 30,
            }}
          >
            {tests && tests.length ? (
              tests.map((test) => {
                return (
                  <Test key={test.id} test={test} profileInfo={profileInfo} />
                );
              })
            ) : (
              <NotTests />
            )}
          </CardDeck>
          {visiblePagination && totalPages.length ? (
            <PaginationCustom
              currentPage={currentPage}
              fetchNewPosts={fetchNewPosts}
              totalPages={totalPages}
            />
          ) : null}
        </div>
        {loading && <Loader />}
      </Container>
    </Suspense>
  );
};

export default TestsPage;
