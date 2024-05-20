import { Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ButtonCustom from "../../components/ButtonComponent/ButtonCustom";

const Login = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onHide={props.onHide}>
        <Modal.Title id="contained-modal-title-vcenter">ĐĂNG NHẬP</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Tài khoản :</Form.Label>
            <Form.Control type="email" placeholder="Tài khoản ...." />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mật khẩu :</Form.Label>
            <Form.Control type="password" placeholder="Mật khẩu ...." />
          </Form.Group>
          <Form.Group
            className="mb-3, justify-content-between "
            style={{ display: "flex" }}
            controlId="formBasicCheckbox"
          >
            <Form.Check type="checkbox" label="Ghi nhớ mật khẩu ?" />
            <Link style={{ textDecoration: "none" }} to="/forgot">
              Quên mật khẩu
            </Link>
          </Form.Group>
          <ButtonCustom content="Đăng nhập"/>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

Login.propTypes = {
  onHide: PropTypes.func,
};

export default Login;
