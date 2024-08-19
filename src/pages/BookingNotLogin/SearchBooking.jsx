import { useRef } from "react";
import {
  Button,
  ButtonGroup,
  FloatingLabel,
  Form,
  Modal,
} from "react-bootstrap";
import PropTypes from "prop-types";

const SearchBooking = ({ show, close }) => {
  const searchRef = useRef(null);

  const handleShow = () => {
    window.location.href = `/no-account/${searchRef.current.value}`;
  };

  return (
    <div>
      <Modal show={show} onHide={close}>
        <Modal.Body>
          <Form>
            <FloatingLabel label="Email hoặc SĐT của bạn">
              <Form.Control ref={searchRef} />
            </FloatingLabel>
            <ButtonGroup>
              <Button onClick={handleShow}>Tìm</Button>
              <Button variant="danger" onClick={close}>
                Đóng
              </Button>
            </ButtonGroup>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

SearchBooking.propTypes = {
  show: PropTypes.bool,
  close: PropTypes.func,
  isPopup: PropTypes.bool,
};

export default SearchBooking;
