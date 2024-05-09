import "react-bootstrap";
import { Navbar, Container, Image, Form, Button, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Banner from "../BannerComponent/Banner";

export default function Header() {
  // const bannerArr = [
  //     "/src/assets/image/banner1.png",
  //     "/src/assets/image/banner2.png",
  //     "/src/assets/image/banner3.png",
  // ]

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <div className="d-flex flex-row align-items-center">
            <Navbar.Brand href="#home">
              <Image
                src="/src/assets/image/logo.png"
                alt="Logo"
                style={{
                  height: "auto",
                }}
              />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Form inline="true" className="d-flex flex-row">
                  <Form.Control
                    type="text"
                    placeholder="Tìm kiếm"
                    className="mr-sm-2"
                    style={{
                      width: "700px",
                    }}
                  />
                  <Button
                    type="submit"
                    style={{
                      height: "40px",
                      width: "100px",
                      marginLeft: "10px",
                    }}
                    variant="outline-dark"
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </Button>
                </Form>
              </Nav>

              <Nav
                className="align-items-between"
                style={{
                  marginLeft: "10px",
                }}
              >
                <Button
                  variant="none"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <i className="fa-solid fa-user mb-3"></i>
                  <span>Tài khoản</span>
                </Button>
                <Button
                  variant="none"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <i className="fa-solid fa-cart-shopping mb-3"></i>
                  <span>Giỏ hàng</span>
                </Button>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
      <Banner />
    </>
  );
}
