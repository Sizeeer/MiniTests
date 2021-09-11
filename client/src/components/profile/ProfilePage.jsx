//Core
import { useState, useEffect, lazy } from "react";
import { Col, Container, Image, CardDeck, Button } from "react-bootstrap";

//Hooks
import { useMyGetTests } from "../../hooks/useGetMyTests";
import { useGetProfileInfo } from "../../hooks/useGetProfileInfo";
import { useGetMyTestByTitle } from "../../hooks/useGetMyTestByTitle";
import { useCreateTest } from "../../hooks/useCreateTest";

//Components
import { SearchComponent } from "../common/SearchComponent";
import { NotTests } from "../common/NotTests";
import { CreateModal } from "./CreateModal";
import { Suspense } from "react";
import Loader from "../common/Loader";
const PaginationCustom = lazy(() => import("../common/Pagination"));
const Test = lazy(() => import("../common/Test"));
const Header = lazy(() => import("../header/Header"));

const ProfilePage = () => {
  const { profileInfo: dbProfileInfo, loading: profileInfoLoading } =
    useGetProfileInfo();
  const {
    fetchMore,
    myTests,
    totalTests,
    loading: myTestsLoading,
  } = useMyGetTests();

  const {
    getMyTestByTitle,
    testByTitle,
    loading: myTestByTitleLoading,
  } = useGetMyTestByTitle();

  const { createTest, loading: createTestLoading } = useCreateTest();

  const [tests, setTests] = useState([]);
  const [profileInfo, setProfileInfo] = useState(null);
  const [totalPages, setTotalPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [visiblePagination, setVisiblePagination] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (dbProfileInfo) {
      setProfileInfo(dbProfileInfo);
    }
    return () => setProfileInfo(null);
  }, [dbProfileInfo]);

  useEffect(() => {
    if (testByTitle) {
      setTests([testByTitle]);
      setVisiblePagination(false);
    }
  }, [testByTitle]);

  useEffect(() => {
    if (totalTests) {
      let newArrPages = [];
      for (let i = 0; i < totalTests / 4; i++) {
        newArrPages.push(i + 1);
      }
      setTotalPages(newArrPages);
    }

    return () => {
      setTotalPages([]);
    };
  }, [totalTests]);

  useEffect(() => {
    if (myTests) {
      setTests(myTests);
    }
    return () => setTests([]);
  }, [myTests]);

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
    setTests(myTests);
    setVisiblePagination(true);
  };

  const closeModal = () => {
    setShow(false);
  };
  const showModal = () => {
    setShow(true);
  };

  const addNewTest = (createTestInput) => {
    createTest(createTestInput);
  };

  const loading =
    myTestsLoading ||
    profileInfoLoading ||
    myTestByTitleLoading ||
    createTestLoading;

  return (
    <Suspense fallback={<Loader />}>
      <Container
        className="p-0 vh-100"
        style={{
          maxWidth: 1360,
        }}
      >
        <Header />
        <div style={{ marginTop: 103, paddingBottom: 30 }}>
          <Container
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              marginBottom: 30,
            }}
          >
            <Image
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              style={{
                width: 180,
                height: 180,
                border: "2px solid #000",
                borderRadius: "50%",
                marginBottom: 20,
              }}
            />
            <h2 style={{ fontWeight: 700 }}>
              {profileInfo && profileInfo.firstName}
            </h2>
            <p style={{ fontWeight: 400, color: "rgba(0,0,0,0.6)" }}>
              {profileInfo && profileInfo.email}
            </p>
          </Container>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Col lg={10}>
              <SearchComponent
                getTestByTitle={getMyTestByTitle}
                refetchPosts={refetchPosts}
                lg={4}
              />
            </Col>
            <Col lg="auto">
              <Button className="outline-primary" onClick={showModal}>
                <i className="bi bi-plus-circle"></i>
              </Button>
            </Col>
          </div>
          <CardDeck
            style={{
              marginBottom: 30,
              flexWrap: "nowrap",
              flexDirection: "row",
            }}
          >
            {tests && tests.length ? (
              tests.map((test) => {
                return (
                  <Test
                    key={test.id}
                    test={test}
                    profileInfo={profileInfo}
                    isMyTest={true}
                    setTests={setTests}
                  />
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
          <CreateModal
            show={show}
            onHide={closeModal}
            addNewTest={addNewTest}
          />
        </div>
        {loading && <Loader />}
      </Container>
    </Suspense>
  );
};

export default ProfilePage;
