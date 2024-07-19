import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";

const Announcement = ({ show, content }) => {
  return (
    <div>
      <Modal show={show} centered>
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
};

export default Announcement;
