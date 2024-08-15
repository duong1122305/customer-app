import {
  Navbar,
  Nav,
  Container,
  Image,
  InputGroup,
  Form,
  NavDropdown,
  Button,
  Offcanvas,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Register from "../../pages/Register/Register";
import Login from "../../pages/Login/Login";
import Search from "../SearchComponent/Search";
import callApi from "../../utlis/request";

export default function Header() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [show, setShow] = useState(false);
  const [registerShow, setRegisterShow] = useState(false);
  const [loginShow, setLoginShow] = useState(false);
  const [searchShow, setSearchShow] = useState(false);

  // handle visible
  const [isVisible, setIsVisible] = useState(false);
  const [isToggleVisible, setIsToggleVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [avartar, setAvatar] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    // Set isVisible to false when screenWidth is greater than 961px
    setIsVisible(screenWidth <= 961);

    // Set isToggleVisible based on your desired screen widths
    setIsToggleVisible(
      screenWidth <= 1900 ||
        screenWidth <= 1800 ||
        screenWidth <= 1980 ||
        screenWidth <= 3200 ||
        screenWidth <= 3900 ||
        screenWidth <= 2160
    );

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenWidth]);

  const showOffCanvas = () => setShow(true);
  const closeOffCanvas = () => setShow(false);
  const handleShowRegister = () => setRegisterShow(true);
  const handleShowLogin = () => setLoginShow(true);
  const handleOffcanvasShow = () => setShow(false);
  // const handleSearchShow = () => setSearchShow(true);
  const handleSearchClose = () => setSearchShow(false);

  const handleLogin = useCallback(() => {
    setIsLogin(true);
  }, []);

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const result = JSON.parse(token);

    if (token) {
      setIsLogin(true);
      setUsername(result.username);
      const id = result.id;

      try {
        const findInfo = async () => {
          const response = await callApi(`GuestManager/find-by-id?id=${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const responseResult = await response.json();
          if (responseResult.isSuccess === true) {
            setAvatar(responseResult.data.avatarUrl);
          } else {
            console.error(responseResult.error);
          }
        };

        findInfo();
      } catch (error) {
        console.error(error);
      }
    }
  }, [token]);

  const handleLogout = useCallback(() => {
    setIsLogin(false);
    sessionStorage.removeItem("token");
  }, []);

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className="header" sticky="top">
        <Container>
          <Navbar.Brand className="m-0 p-0">
            <Image style={{ width: "50px" }} src="/assets/image/logo.jpg" />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            style={{ display: isToggleVisible ? "none" : "block" }}
          />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            style={{ display: isVisible ? "none" : "block" }}
          >
            <div
              className="thea"
              style={{ display: "flex", marginLeft: "30px" }}
            >
              <Nav.Item style={{ marginRight: 20 }}>
                <Nav.Link as={Link} to="/">
                  Giới thiệu
                </Nav.Link>
              </Nav.Item>
              <Nav.Item style={{ marginRight: 20 }}>
                <Nav.Link as={Link} to="/services">
                  Dịch vụ
                </Nav.Link>
              </Nav.Item>
              <Nav.Item style={{ marginRight: 20 }}>
                <Nav.Link as={Link} to="/listProduct">
                  Sản phẩm
                </Nav.Link>
              </Nav.Item>
              <Nav.Item style={{ marginRight: 20 }}>
                <Nav.Link as={Link} to="/contact">
                  Liên hệ
                </Nav.Link>
              </Nav.Item>
              <Nav.Item style={{ marginRight: 20 }}>
                <Nav.Link as={Link} to="/booking">
                  Đặt lịch
                </Nav.Link>
              </Nav.Item>
              <Nav.Item style={{ marginRight: 20 }}>
                <Nav.Link as={Link} to="/blog">
                  Sự kiện
                </Nav.Link>
              </Nav.Item>
            </div>
            <Nav className="me-auto"></Nav>
            <Nav style={{ display: isLogin ? "none" : "flex" }}>
              <Nav.Item onClick={handleShowRegister}>
                <Nav.Link>Đăng ký</Nav.Link>
              </Nav.Item>
              <Nav.Item onClick={handleShowLogin}>
                <Nav.Link>Đăng nhập</Nav.Link>
              </Nav.Item>
            </Nav>
            <Nav
              style={{
                display: isLogin ? "flex" : "none",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src={
                  avartar == null
                    ? "https://dersteira.at/img/nh-nn-trng-fb.jpg"
                    : avartar
                }
                style={{ borderRadius: "10px", width: "30px", height: "30px" }}
              />
              <NavDropdown title={username} className="dropdown">
                <NavDropdown.Item as={Link} to="/profile">
                  Thông tin
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/">
                  Đổi mật khẩu
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/" onClick={handleLogout}>
                  Đăng xuất
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>

          <Button
            variant="outline-light"
            onClick={showOffCanvas}
            style={{ display: isVisible ? "block" : "none", width: "80px" }}
          >
            <i className="fa-solid fa-bars"></i>
          </Button>

          <Offcanvas
            className="offcanvas"
            show={show}
            onHide={closeOffCanvas}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>DANH MỤC</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body style={{ display: "block" }}>
              <Nav className="me-auto">
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1" style={{ width: "40px" }}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Search..."
                    aria-label="Search"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
              </Nav>
              <Nav style={{ display: isLogin ? "none" : "flex" }}>
                <Nav.Item onClick={handleShowRegister}>
                  <Nav.Link>Đăng ký</Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={handleShowLogin}>
                  <Nav.Link>Đăng nhập</Nav.Link>
                </Nav.Item>
              </Nav>
              <Nav
                as="ul"
                className="justify-content-center"
                style={{ height: "40px", marginTop: "150px" }}
                variant="underline"
              >
                <Nav.Item
                  as="li"
                  style={{ display: isLogin ? "block" : "none" }}
                >
                  <Nav.Link
                    as={Link}
                    to="/profile"
                    onClick={handleOffcanvasShow}
                  >
                    Tài khoản
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item
                  as="li"
                  style={{ display: isLogin ? "block" : "none" }}
                >
                  <Nav.Link
                    onClick={handleOffcanvasShow}
                    as={Link}
                    to="/changePass"
                  >
                    Đổi mật khẩu
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link onClick={handleOffcanvasShow} as={Link} to="/">
                    Giới thiệu
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link
                    onClick={handleOffcanvasShow}
                    as={Link}
                    to="/services"
                  >
                    Dịch vụ
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link
                    onClick={handleOffcanvasShow}
                    as={Link}
                    to="/employ"
                  >
                    Tuyển dụng
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link
                    onClick={handleOffcanvasShow}
                    as={Link}
                    to="/contact"
                  >
                    Liên hệ
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link
                    onClick={handleOffcanvasShow}
                    as={Link}
                    to="/booking"
                  >
                    Đặt lịch
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </Navbar>
      <Register show={registerShow} onHide={() => setRegisterShow(false)} />
      <Login
        style
        show={loginShow}
        onHide={() => setLoginShow(false)}
        onLogin={handleLogin}
      />
      <Search show={searchShow} onHide={handleSearchClose} />
    </div>
  );
}
