import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

const AcceptRequest = ({ show, onClose, onAccept, content }) => {
    const handleAccept = () => {
        onAccept();
        onClose();
    }
  return (
    <div>
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{content}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAccept}>Xác nhận</Button>
          <Button variant="danger" onClick={onClose}>Huỷ</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

AcceptRequest.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  onAccept: PropTypes.func,
  content: PropTypes.string
};

export default AcceptRequest;
