//Core
import { Modal } from "react-bootstrap";

//Components
import { CreateForm } from "./CreateForm";

export const CreateModal = ({ addNewTest, ...props }) => {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-center2"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-center2">
          Создай свой тест!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateForm addNewTest={addNewTest} />
      </Modal.Body>
    </Modal>
  );
};
