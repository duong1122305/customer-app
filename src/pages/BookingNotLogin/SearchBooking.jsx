import React, { useRef, useState } from "react";
import {
  Button,
  ButtonGroup,
  FloatingLabel,
  Form,
  Modal,
} from "react-bootstrap";
import PropTypes from "prop-types";
import BookingNotLogin from "./BookingNotLogin";

const SearchBooking = ({ show, close }) => {
  const searchRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [result, setResult] = useState("");

  const handleShow = () => {
    setShowPopup(true);
    setResult(searchRef.current.value);
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
      <BookingNotLogin
        show={showPopup}
        phoneOrEmail={result}
        close={() => setShowPopup(false)}
      />
    </div>
  );
};

SearchBooking.propTypes = {
  show: PropTypes.func,
  close: PropTypes.func,
};

export default SearchBooking;
