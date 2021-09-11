import { Container, Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: "rgba(211, 211, 211, .6)",
        zIndex: 1031,
      }}
    >
      <Container className="d-flex justify-content-center align-items-center h-100">
        <Spinner animation="border" variant="primary" />
      </Container>
    </div>
  );
};

export default Loader;
