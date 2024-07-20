import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";

const Announcement = ({ show, content, onClose }) => {
  return (
    <div>
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
      </Modal>
    </div>
  );
};

/**
 * @param content - nội dung hiển thị của popup
 */

Announcement.propTypes = {
  content: PropTypes.string,
  show: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Announcement;
