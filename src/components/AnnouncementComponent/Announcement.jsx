import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const Announcement = ({ show, content, onClose }) => {
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    if (isShow) {
      const timeout = setTimeout(() => {
        setIsShow(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [isShow]);

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
