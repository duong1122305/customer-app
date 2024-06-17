import { Modal, Form, Button, Alert } from "react-bootstrap";
import ButtonCustom from "../../components/ButtonCustomComponent/ButtonCustom";
import PropTypes from 'prop-types';
import { useState } from 'react';

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowError(false);
    props.onHide();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password || !confirmPassword) {
      setShowError(true);
    } else {
      // Process your registration logic here
      console.log("Email:", email, "Password:", password, "Confirm Password:", confirmPassword);
      handleClose();
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={handleClose}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          ĐĂNG KÝ
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Nhập email" value={email} onChange={(e) => setEmail(e.target.value)} isInvalid={showError && !email}/>
            <Form.Control.Feedback type="invalid">Vui lòng nhập địa chỉ email.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mật khẩu</Form.Label>
           <div style={{display:"flex"}}>
            <div style={{marginRight:10}} >
           <Form.Control type={showPassword ? "text" : "password"} placeholder="Nhập mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)}  isInvalid={showError && !password} style={{width:399}}/>
            </div>
            <Button variant="outline-secondary" onClick={toggleShowPassword} className="password-toggle-btn">{showPassword ? "Ẩn" : "Hiện"}</Button> 
           </div>
            <Form.Control.Feedback type="invalid">Vui lòng nhập mật khẩu.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Nhập lại mật khẩu</Form.Label>
          <div style={{display:"flex"}}>
            <div style={{marginRight:10}}>
          <Form.Control type={showConfirmPassword ? "text" : "password"}placeholder="Nhập lại mật khẩu"value={confirmPassword}onChange={(e) => setConfirmPassword(e.target.value)}isInvalid={showError && !confirmPassword} style={{width:399}}/>
            </div>
            <Button variant="outline-secondary" onClick={toggleShowConfirmPassword} className="password-toggle-btn">{showConfirmPassword ? "Ẩn" : "Hiện"}</Button>
          </div>
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập lại mật khẩu.
            </Form.Control.Feedback>
          </Form.Group>
           <div style={{display:"flex",justifyContent:"center"}}>
           <ButtonCustom content="Đăng ký" type="submit" />
            <ButtonCustom content="Nhập lại" type="reset" />
           </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

Register.propTypes = {
  onHide: PropTypes.func.isRequired
};

export default Register;
