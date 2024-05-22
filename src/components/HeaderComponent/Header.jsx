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
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "../../pages/Register/Register";
import Login from "../../pages/Login/Login";
import Search from "../SearchComponent/Search";
import GioiThieu from "../../pages/GioiThieu/GioiThieu";
import DichVu from "../../pages/DichVu/DichVu";
import DatLich from "../../pages/DatLich/DatLich";

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
  // const [results, setResults] = useState([]);

  //handle button offcanvas
  const showOffCanvas = () => setShow(true);
  const closeOffCanvas = () => setShow(false);
  const handleShowRegister = () => setRegisterShow(true);
  const handleShowLogin = () => setLoginShow(true);
  const handleOffcanvasShow = () => setShow(false);
  const handleSearchShow = () => setSearchShow(true);
  const handleSearchClose = () => setSearchShow(false);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    if (screenWidth <= 916) {
      setIsVisible(true);
      // console.log("re render offcanvas");
    } else {
      setIsVisible(false);
    }

    if (screenWidth <= 1900 || screenWidth <= 1800) {
      setIsToggleVisible(true);
      // console.log("re render toggle");
    } else {
      setIsToggleVisible(false);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenWidth]);

  return (
    <BrowserRouter>
      <Navbar collapseOnSelect expand="lg" className="header" sticky="top">
        <Container>
          <Navbar.Brand className="m-0 p-0">
            <Image style={{ width: "70px" }} src="/src/assets/image/logo.jpg" />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            style={{ display: isToggleVisible ? "none" : "block" }}
          />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            style={{ display: isToggleVisible ? "none" : "block" }}
          >
            <div
              className="thea"
              style={{ display: "flex", marginLeft: "10px" }}
            >
              <Nav.Item>
                <Nav.Link as={Link} to="/">
                  Giới thiệu
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/services">
                  Dịch vụ
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/employ">
                  Tuyển dụng
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/contact">
                  Liên hệ
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/booking">
                  Đặt lịch
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/blog">
                  Tin tức
                </Nav.Link>
              </Nav.Item>
            </div>
            <Nav className="me-auto"></Nav>
            <Button
              style={{ backgroundColor: "#fff", color: "black" }}
              variant="outline-light"
              onClick={handleSearchShow}
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </Button>
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
              <i className="fa-solid fa-user" style={{ color: "#fff" }}></i>
              <NavDropdown title="Tài khoản" className="dropdown">
                <NavDropdown.Item as={Link} to="/">
                  Thông tin
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/">
                  Đổi mật khẩu
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/">
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
                  <InputGroup.Text id="basic-addon1" style={{width:"40px"}}>
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
                    to="/account"
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
      <Login show={loginShow} onHide={() => setLoginShow(false)} />
      <Search
        show={searchShow}
        // results={results}
        // setresult={setResults}
        onHide={handleSearchClose}
      />
      <div>
        <Routes>
          <Route path="/" element={<GioiThieu />} />
          <Route path="/services" element={<DichVu />} />
          <Route path="/booking" element={<DatLich />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
