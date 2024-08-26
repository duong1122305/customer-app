import { useEffect, useRef, useState } from "react";
import { Modal, Form, Button, FloatingLabel } from "react-bootstrap";
import PropTypes from "prop-types";
import Announcement from "../../components/AnnouncementComponent/Announcement";
import callApi from "../../utlis/request";
import "./Register.css";

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
  const [selectedFile, setSelectedFile] = useState(null);
  const [provinces, setProvince] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [errors, setError] = useState({});

  const [selectedProvinces, setSelectedProvinces] = useState({
    id: "89",
    name: "Tỉnh An Giang",
  });
  const [selectedDistricts, setSelectedDistricts] = useState({
    id: "886",
    name: "Huyện An Phú",
  });
  const [selectedWard, setSelectedWard] = useState({
    id: "30337",
    name: "Thị trấn An Phú",
  });

  const homeRef = useRef(null);

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
    const newError = {};

    const regex = /[^a-zA-Z\s]/g;
    if (name.trim().length < 0 || name.trim().length === 0) {
      newError.name = "Tên không được để trống";
    } else if (name.trim().length < 3 || name.trim().length > 50) {
      newError.name = "Tên không được nhỏ hơn 3 hoặc lớn hơn 50 ký tự";
    } else if (!regex.test(name.trim())) {
      newError.name = "Tên không được chứa ký tự đặc biệt và số";
    }

    if (password.trim().length < 0 || name.trim().length === 0) {
      newError.password = "Mật khẩu không được để trống";
    } else if (password.trim().length < 6 || password.trim().length > 20) {
      newError.password = "Mật khẩu phải từ 6 đến 20 ký tự";
    }

    const phoneRegex = /^(03[2-9]|05[689]|07[06-9]|08[1-689]|09[0-46-9])\d{7}$/;
    if (phone.trim().length < 0 || phone.trim().length > 11) {
      newError.phone = "SĐT không được để trống";
    } else if (!phoneRegex.test(phone)) {
      newError.phoneNumber = "SĐT không hợp lệ";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim().length < 0 || email.trim().length === 0) {
      newError.email = "Email không được để trống";
    } else if (!emailRegex.test(email)) {
      newError.email = "Email không hợp lệ";
    }

    if (username.trim().length < 0 || username.trim().length === 0) {
      newError.userName = "Tên tài khoản không được để trống";
    } else if (username.trim().length < 5 || username.trim().length > 20) {
      newError.userName =
        "Tên tài khoản không được nhỏ hơn 5 hoặc quá 20 ký tự";
    }

    if (
      confirmPassword.trim().length < 0 ||
      confirmPassword.trim().length === 0
    ) {
      newError.confirmPassword = "Không được để trống trường này";
    } else if (confirmPassword.trim() !== password.trim()) {
      newError.confirmPassword = "Mật khẩu không khớp";
    }

    setError(newError);

    if (Object.keys(newError).length === 0) {
      const postData = {
        name: name,
        gender: true,
        password: password,
        phoneNumber: phone,
        address: `${selectedWard.id}!${homeRef.current.value}!${selectedWard.name}, ${selectedDistricts.name}, ${selectedProvinces.name}`,
        email: email,
        userName: username,
        avatarFile: selectedFile,
      };
      handleRegis(postData);
    }
  };

  useEffect(() => {
    const getProvinces = async () => {
      const response = await fetch("https://esgoo.net/api-tinhthanh/1/0.htm", {
        method: "GET",
      });
      if (response.ok) {
        var result = await response.json();
        setProvince(result.data);
      }
    };

    getProvinces();
  }, [selectedDistricts, selectedProvinces]);

  useEffect(() => {
    const getDistricts = async () => {
      const response = await fetch(
        `https://esgoo.net/api-tinhthanh/2/${selectedProvinces.id}.htm`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const result = await response.json();
        setDistricts(result.data);
      }
    };
    getDistricts();
  }, [selectedProvinces]);

  useEffect(() => {
    const getWards = async () => {
      const response = await fetch(
        `https://esgoo.net/api-tinhthanh/3/${selectedDistricts.id}.htm`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const result = await response.json();
        setWards(result.data);
      }
    };
    getWards();
  }, [selectedDistricts]);

  async function handleRegis(postData) {
    try {
      const formData = new FormData();
      for (const key in postData) {
        formData.append(key, postData[key]);
      }
      const response = await callApi("GuestManager/register-by-guest", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.isSuccess == true) {
        setShowAnnoun(true);
        setContentAnnoun("Mã xác minh đã gửi tới email của bạn");
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

  // const toggleShowPassword = () => {
  //   setShowPassword(!showPassword);
  // };

  // const toggleShowConfirmPassword = () => {
  //   setShowConfirmPassword(!showConfirmPassword);
  // };

  const handleProvincesChange = (event) => {
    const selectedOption = provinces.find(
      (pro) => pro.id === event.target.value
    );
    setSelectedProvinces({
      id: event.target.value,
      name: selectedOption ? selectedOption.full_name : "",
    });
  };

  const handleDistrictsChange = (event) => {
    const selectedOption = districts.find(
      (pro) => pro.id === event.target.value
    );
    setSelectedDistricts({
      id: event.target.value,
      name: selectedOption ? selectedOption.full_name : "",
    });
  };

  const handleWardChange = (event) => {
    const selectedOption = wards.find((pro) => pro.id === event.target.value);
    setSelectedWard({
      id: event.target.value,
      name: selectedOption ? selectedOption.full_name : "",
    });
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
              />
              {errors.name && <div className="text-danger">{errors.name}</div>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>SĐT</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập SĐT"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                // isInvalid={
                //   (showError && !phone.trim()) ||
                //   (phone.trim() && phone.length < 10) ||
                //   phone.length > 10
                // }
              />
              {errors.phoneNumber && (
                <div className="text-danger">{errors.phoneNumber}</div>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Địa chỉ</Form.Label>
              <FloatingLabel label="Số nhà, Đường" className="mb-2">
                <Form.Control ref={homeRef} />
              </FloatingLabel>
              <div className="d-flex">
                <FloatingLabel label="Tỉnh/Thành" className="mb-2 w-auto">
                  <Form.Select onChange={handleProvincesChange}>
                    {provinces.map((pro, index) => (
                      <option key={index} value={pro.id}>
                        {pro.full_name}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
                <FloatingLabel label="Quận/huyện" className="mb-2 w-auto">
                  <Form.Select onChange={handleDistrictsChange}>
                    {districts.map((dis, index) => (
                      <option key={index} value={dis.id}>
                        {dis.full_name}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
                <FloatingLabel label="Xã/phường">
                  <Form.Select onChange={handleWardChange}>
                    {wards.map((war, index) => (
                      <option key={index} value={war.id}>
                        {war.full_name}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Tên đăng nhập</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                // isInvalid={showError && !username.trim()}
              />
              {errors.userName && (
                <div className="text-danger">{errors.userName}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // isInvalid={showError && !email.trim()}
              />
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu (6-8 ký tự)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // isInvalid={
                //   (showError && !password.trim()) ||
                //   (password.trim() &&
                //     (password.length < 6 || password.length > 20))
                // }
                style={{ flex: 1 }}
              />
              {errors.password && (
                <div className="text-danger">{errors.password}</div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>Nhập lại mật khẩu</Form.Label>
              <Form.Control
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                // isInvalid={
                //   (showError && !confirmPassword.trim()) ||
                //   (confirmPassword.trim() && confirmPassword !== password)
                // }
                style={{ flex: 1 }}
              />
              {errors.confirmPassword && (
                <div className="text-danger">{errors.confirmPassword}</div>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Thêm ảnh</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => {
                  setSelectedFile(e.target.files[0]);
                }}
              />
            </Form.Group>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button type="submit" style={{ marginRight: 5 }}>
                Đăng ký
              </Button>
              <Button type="reset">Nhập lại</Button>
              <Button onClick={handleClose}>Đóng</Button>
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
