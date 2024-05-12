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
import Banner from "../BannerComponent/Banner";
import { useEffect, useState } from "react";

export default function Header() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [show, setShow] = useState(false);

  // handle visible
  const [isVisible, setIsVisible] = useState(false);
  const [isToggleVisible, setIsToggleVisible] = useState(false);

  //handle button offcanvas
  const showOffCanvas = () => setShow(true);
  const closeOffCanvas = () => setShow(false);

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

    if (screenWidth <= 1900) {
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
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary"
        sticky="top"
      >
        <Container>
          <Navbar.Brand href="#home">
            <Image
              className="w-75"
              src="/src/assets/image/logo.png"
              roundedCircle
            />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            style={{ display: isToggleVisible ? "none" : "block" }}
          />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            style={{ display: isToggleVisible ? "none" : "block" }}
          >
            <Nav className="me-auto">
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search..."
                  aria-label="Search"
                  aria-describedby="basic-addon1"
                  htmlSize={100}
                />
              </InputGroup>
            </Nav>
            <Nav
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <i className="fa-solid fa-user"></i>
              <NavDropdown title="Tài khoản">
                <NavDropdown.Item href="#">Thông tin</NavDropdown.Item>
                <NavDropdown.Item href="#">Đổi mật khẩu</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">Đăng xuất</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <Button
            variant="outline-dark"
            onClick={showOffCanvas}
            style={{ display: isVisible ? "block" : "none", width: "80px" }}
          >
            <i className="fa-solid fa-bars"></i>
          </Button>

          <Offcanvas show={show} onHide={closeOffCanvas} placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="me-auto">
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Search..."
                    aria-label="Search"
                    aria-describedby="basic-addon1"
                    htmlSize={100}
                  />
                </InputGroup>
              </Nav>
              <Nav
                style={{
                  border: "1px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: "black",
                }}
                roundedCircle
              >
                <i className="fa-solid fa-user"></i>
                <NavDropdown title="Tài khoản">
                  <NavDropdown.Item href="#">Thông tin</NavDropdown.Item>
                  <NavDropdown.Item href="#">Đổi mật khẩu</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#">Đăng xuất</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </Navbar>
      <Nav as="ul" className="justify-content-center" style={{height:"40px"}} variant="underline">
        <Nav.Item as="li">
          <Nav.Link href="#">Giới thiệu</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link href="#">Dịch vụ</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link href="#">Tuyển dụng</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link href="#">Liên hệ</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link href="#">Đặt lịch</Nav.Link>
        </Nav.Item>
      </Nav>
      <Banner />
    </>
  );
}