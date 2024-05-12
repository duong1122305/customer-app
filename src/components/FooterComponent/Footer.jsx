import { Container, Row, Col, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <Container
      fluid
      style={{
        backgroundColor: "#fff",
        color: "black",
        marginTop:"50px"
      }}
    >
      <Row style={{ marginTop: "10px", height:"auto" }}>
        <Col
          className="d-flex"
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Row>
            <Col
              className="d-flex"
              style={{
                alignItems: "center",
                marginTop:"20px"
              }}
            >
              <Image
                src="/src/assets/image/logo.png"
                style={{ height: "130px" }}
              />
              <h5>Pet Mew</h5>
            </Col>
          </Row>
          <Row style={{ width: "300px" }}>
            <span>
              Pet shop MewMew là trung tâm dịch vụ chăm sóc thú cưng chất lượng
              cao. Chúng tôi cung cấp các giải pháp và dịch vụ chăm sóc thú cưng
              toàn diện, chuyên nghiệp TOP đầu tại Hà Nội.
            </span>
          </Row>
          <Col
            style={{
              fontSize: "20px",
              letterSpacing: "20px",
              marginTop: "30px",
            }}
          >
            <span>
              <a href="#">
                <i
                  className="fa-brands fa-facebook"
                  style={{ color: "blue", cursor: "pointer" }}
                ></i>
              </a>
            </span>
            <span>
              <a href="#">
                <i
                  className="fa-brands fa-instagram"
                  style={{ color: "palevioletred", cursor: "pointer" }}
                ></i>
              </a>
            </span>
            <span>
              <a href="#">
                <i
                  className="fa-brands fa-tiktok"
                  style={{ cursor: "pointer", color: "black" }}
                ></i>
              </a>
            </span>
            <span>
              <a href="#">
                <i
                  className="fa-brands fa-youtube"
                  style={{ color: "red", cursor: "pointer" }}
                ></i>
              </a>
            </span>
            <span>
              <a>
                <i
                  className="fa-solid fa-envelope"
                  style={{ cursor: "pointer" }}
                ></i>
              </a>
            </span>
          </Col>
        </Col>
        <Col
          style={{
            lineHeight: "30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width:"400px"
          }}
          xs
          lg="5"
        >
          <Row>
            <h5>THÔNG TIN LIÊN HỆ:</h5>
          </Row>
          <Row>
            <i
              className="fa-solid fa-building"
              style={{ color: "#584c47" }}
            ></i>
            <span>CỬA HÀNG CHĂM SÓC THÚ CƯNG MEWMEW</span>
          </Row>
          <Row>
            <i
              className="fa-solid fa-location-dot"
              style={{ color: "red" }}
            ></i>
            <p>Số 16b, lô A, quận 12, thành phố Hồ Chí Minh</p>
          </Row>
          <Row>
            <i className="fa-regular fa-envelope"></i>
            <span>petshopmew@gmail.com</span>
          </Row>
          <Row>
            <i className="fa-solid fa-globe" style={{ color: "blue" }}></i>
            <span>www.petshopmew.com.vn</span>
          </Row>
        </Col>
        <Col style={{ lineHeight: "50px", marginTop: "50px", }} xs lg="4">
          <Row>
            <h5>THỜI GIAN LÀM VIỆC:</h5>
          </Row>
          <Row>
            <span>Cửa hàng làm việc tất cả các ngày trong tuần</span>
          </Row>
          <Row>
            <span>Khung giờ mở cửa: 08:00 - 21:00</span>
          </Row>
        </Col>
      </Row>
      <Row>
        <hr
          style={{
            border: "none",
            height: "2px",
            backgroundColor: "black",
            width: "100%",
            maxWidth: "600px",
            margin: "auto",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "20px",
          }}
        >
          <div>
            <a href="#" style={{ textDecoration: "none", color: "black" }}>
              <span>ĐIỀU KHOẢN SỬ DỤNG</span>
            </a>
            <span> | </span>
            <a href="#" style={{ textDecoration: "none", color: "black" }}>
              <span>CHÍNH SÁCH BẢO MẬT</span>
            </a>
          </div>
          <span>COPYRIGHT © 2024 PETMEW. ALL RIGHTS RESERVED.</span>
        </div>
      </Row>
    </Container>
  );
};

export default Footer;
