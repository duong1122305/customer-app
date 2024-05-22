import { Modal, Form } from "react-bootstrap";
import ButtonCustom from "../../components/ButtonCustomComponent/ButtonCustom";

import PropTypes from 'prop-types';

const Register = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onHide={props.onHide}>
        <Modal.Title id="contained-modal-title-vcenter">
          ĐĂNG KÝ
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <ButtonCustom content="Đăng ký" type="submit"/>
      <ButtonCustom content="Nhập lại" type="reset"/>
    </Form>
      </Modal.Body>
    </Modal>
  );
};

Register.propTypes = {
    onHide: PropTypes.func
}

export default Register;
