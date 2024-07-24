import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import Announcement from "../../components/AnnouncementComponent/Announcement";
import callApi from "../../utlis/request";

const Register = (props) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showAnnoun, setShowAnnoun] = useState(false);
  const [contentAnnoun, setContentAnnoun] = useState("");

  const handleClose = () => {
    setName("");
    setEmail("");
    setPhone("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setShowError(false);
    props.onHide();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    if (!trimmedEmail || !trimmedPassword || !trimmedConfirmPassword) {
      setShowError(true);
    } else if (!trimmedName) {
      setShowError(true);
    } else if (
      !trimmedPhone ||
      trimmedPhone.length < 10 ||
      trimmedPhone.length > 10
    ) {
      setShowError(true);
    } else if (!trimmedUsername) {
      setShowError(true);
    } else if (trimmedPassword.length < 6 || trimmedPassword.length > 8) {
      setShowError(true);
    } else if (trimmedPassword !== trimmedConfirmPassword) {
      setShowError(true);
    } else {
      console.log(
        "Email:",
        trimmedEmail,
        "Password:",
        trimmedPassword,
        "Confirm Password:",
        trimmedConfirmPassword
      );
      const postData = {
        name: name,
        gender: true,
        password: password,
        phoneNumber: phone,
        address: "",
        email: email,
        userName: username,
      };
      handleRegis(postData);
    }
  };

  async function handleRegis(postData) {
    try {
      const response = await callApi("GuestManager/register-by-guest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      const result = await response.json();
      if (result.isSuccess == true) {
        setShowAnnoun(true);
        setContentAnnoun("Đăng ký thành công");
        handleClose();
      } else {
        setShowAnnoun(true);
        setContentAnnoun("Đăng ký thất bại: ", result.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleReset = () => {
    setEmail("");
    setName("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
    setShowError(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleClose}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">ĐĂNG KÝ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form method="post" onSubmit={handleSubmit} onReset={handleReset}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập họ và tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isInvalid={showError && !name.trim()}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập họ và tên của bạn.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>SĐT</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập SĐT"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                isInvalid={
                  (showError && !phone.trim()) ||
                  (phone.trim() && phone.length < 10) ||
                  phone.length > 10
                }
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập SĐT của bạn, SĐT phải đủ 10 ký tự.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Tên đăng nhập</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                isInvalid={showError && !username.trim()}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập tên đăng nhập.
              </Form.Control.Feedback>
            </Form.Group>
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
                    (password.trim() &&
                      (password.length < 6 || password.length > 8))
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
              <Button type="submit" style={{ marginRight: 5 }}>
                Đăng ký
              </Button>
              <Button type="reset">Nhập lại</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Announcement
        show={showAnnoun}
        content={contentAnnoun}
        onClose={() => setShowAnnoun(false)}
      />
    </>
  );
};

Register.propTypes = {
  onHide: PropTypes.func.isRequired,
};

export default Register;
