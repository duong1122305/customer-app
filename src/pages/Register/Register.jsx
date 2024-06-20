import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Register = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setShowError(false);
    props.onHide();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    if (!trimmedEmail || !trimmedPassword || !trimmedConfirmPassword) {
      setShowError(true);
    } else if (trimmedPassword.length < 6 || trimmedPassword.length > 8) {
      setShowError(true);
    } else if (trimmedPassword !== trimmedConfirmPassword) {
      setShowError(true);
    } else {
      console.log("Email:", trimmedEmail, "Password:", trimmedPassword, "Confirm Password:", trimmedConfirmPassword);
      handleClose();
    }
  };

  const handleReset = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setShowError(false);
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
        <Form onSubmit={handleSubmit} onReset={handleReset}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={showError && !email.trim()}
            />
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập địa chỉ email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mật khẩu</Form.Label>
            <div className="input-group">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu (6-8 ký tự)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={
                  (showError && !password.trim()) ||
                  (password.trim() && (password.length < 6 || password.length > 8))
                }
                style={{ flex: 1 }}
              />
              <Button
                variant="outline-secondary"
                onClick={toggleShowPassword}
                className="password-toggle-btn"
                style={{ marginLeft: -1 }}
              >
                {showPassword ? "Ẩn" : "Hiện"}
              </Button>
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập mật khẩu từ 6-8 ký tự.
              </Form.Control.Feedback>
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Nhập lại mật khẩu</Form.Label>
            <div className="input-group">
              <Form.Control
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                isInvalid={
                  (showError && !confirmPassword.trim()) ||
                  (confirmPassword.trim() && confirmPassword !== password)
                }
                style={{ flex: 1 }}
              />
              <Button
                variant="outline-secondary"
                onClick={toggleShowConfirmPassword}
                className="password-toggle-btn"
                style={{ marginLeft: -1 }}
              >
                {showConfirmPassword ? "Ẩn" : "Hiện"}
              </Button>
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập lại mật khẩu và phải khớp với mật khẩu đã nhập.
              </Form.Control.Feedback>
            </div>
          </Form.Group>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button type="submit" style={{ marginRight: 5 }}>Đăng ký</Button>
            <Button type="reset">Nhập lại</Button>
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
