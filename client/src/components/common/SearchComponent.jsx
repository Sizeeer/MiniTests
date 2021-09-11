import { useContext, useState } from "react";
import { Col, FormControl, Button, Form } from "react-bootstrap";
import { AlertContext } from "../../App";

export const SearchComponent = ({ getTestByTitle, refetchPosts, lg }) => {
  const [searchValue, setSearchValue] = useState("");
  const [showSearchButton, setShowSearchButton] = useState(false);

  const setAlertListHandler = useContext(AlertContext);

  const search = () => {
    if (searchValue) {
      try {
        getTestByTitle(searchValue);
        setShowSearchButton(true);
      } catch (e) {
        setAlertListHandler(e);
      }
    }
  };

  const clear = () => {
    refetchPosts();
    setSearchValue("");
    setShowSearchButton(false);
  };

  return (
    <div className="d-flex" style={{ marginBottom: 27 }}>
      <Col lg="auto" className="pl-0">
        <h2 className="font-weight-bold">All tests</h2>
      </Col>
      <Col lg={lg}>
        <Form className="d-flex search-form">
          {showSearchButton ? (
            <Button
              onClick={clear}
              style={{
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              <i className="bi bi-x-circle"></i>
            </Button>
          ) : (
            <Button
              onClick={search}
              style={{
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              <i className="bi bi-search"></i>
            </Button>
          )}

          <FormControl
            type="text"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            value={searchValue}
            style={{ borderRadius: 0 }}
          />
        </Form>
      </Col>
    </div>
  );
};
