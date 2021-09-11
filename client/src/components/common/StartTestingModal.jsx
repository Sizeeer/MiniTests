import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

export const StartTestingModal = ({
  title,
  description,
  setTestingState,
  questions,
  result,
  ...props
}) => {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-center"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-center">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{description}</p>
        <Link
          className="link-primary"
          to={`/testing`}
          onClick={() => {
            localStorage.setItem("testTitle", JSON.stringify(title));
            localStorage.setItem("questions", JSON.stringify(questions));
            localStorage.setItem("result", JSON.stringify(result));
          }}
        >
          Пройти тест
        </Link>
      </Modal.Body>
    </Modal>
  );
};
