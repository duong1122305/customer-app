import { memo, useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Nav } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";

const Login = ({ onHide, onLogin, ...props }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const handleClose = () => {
    // Xoá dữ liệu đã nhập khi đóng modal
    setUsername("");
    setPassword("");
    setShowError(false);
    // Đóng modal
    onHide();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Kiểm tra nếu các trường không được điền
    if (!username || !password) {
      setShowError(true);
    } else {
      // Xử lý logic đăng nhập ở đây (chưa cài đặt)
      const postData = {
        username: username,
        password: password,
      };
      handleLogin(postData);
      // Sau khi đăng nhập thành công thì có thể ẩn modal và xoá dữ liệu
      setUsername("");
      setPassword("");
      onHide();
    }
  };

  async function handleLogin(postData) {
    const response = await fetch(
      `https://localhost:7039/api/GuestAuthen/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      }
    );
    const result = await response.json();
    const decode = jwtDecode(result.data);
    const tokenValue = {
      name: decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata"],
      email: decode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
      username: decode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      id: decode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
    }
    const objValue = JSON.stringify(tokenValue);
    if (result.isSuccess) {
      sessionStorage.setItem("token", objValue);
      onLogin();
    }
  }

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
            <Form.Label>Email:</Form.Label>
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

          <Form.Group controlId="formBasicPassword" style={{ marginTop: 20 }}>
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

          <Form.Group
            className="text-align-end"
            style={{ textAlign: "end", marginTop: 10 }}
          >
            <Nav.Link as={Link} to="/forgot-password">
              Quên mật khẩu
            </Nav.Link>
          </Form.Group>
          <div style={{ textAlign: "center" }}>
            <button type="submit" id="login">
              Đăng nhập
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

Login.propTypes = {
  onHide: PropTypes.func,
  onLogin: PropTypes.any,
};

export default memo(Login);
