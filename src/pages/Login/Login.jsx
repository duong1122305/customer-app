import React, { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Nav } from 'react-bootstrap'; 
const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const handleClose = () => {
    // Xoá dữ liệu đã nhập khi đóng modal
    setUsername("");
    setPassword("");
    setShowError(false);
    // Đóng modal
    props.onHide();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Kiểm tra nếu các trường không được điền
    if (!username || !password) {
      setShowError(true);
    } else {
      // Xử lý logic đăng nhập ở đây (chưa cài đặt)
      console.log("Đăng nhập với tài khoản:", username, "và mật khẩu:", password);
      // Sau khi đăng nhập thành công thì có thể ẩn modal và xoá dữ liệu
      setUsername("");
      setPassword("");
      props.onHide();
    }
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={handleClose} // Xử lý sự kiện đóng modal
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="text-center">
          ĐĂNG NHẬP
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Tài khoản:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Nhập vào tài khoản"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              isInvalid={showError && !username} // Hiển thị lỗi nếu showError và username không có giá trị
            />
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập tài khoản.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword" style={{marginTop: 20}}>
            <Form.Label>Mật khẩu:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Nhập vào mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={showError && !password} // Hiển thị lỗi nếu showError và password không có giá trị
            />
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập mật khẩu.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="text-align-end" style={{textAlign: "end",marginTop: 10}}>
           
            <Nav.Link as={Link} to="/forgot-password">Quên mật khẩu</Nav.Link>
          </Form.Group>
          <div style={{textAlign: "center"}}>
            <button type="submit">Đăng nhập</button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

Login.propTypes = {
  onHide: PropTypes.func,
};

export default Login;
