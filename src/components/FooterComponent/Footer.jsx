import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css";

const Footer = () => {
  return (
    <Container
      fluid
      style={{
        backgroundColor: "#fff",
        color: "black",
      }}
      className="footer"
    >
      <Row style={{ height: "auto" }}>
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
                marginTop: "20px",
              }}
            >
            </Col>
          </Row>
          <Row style={{ width: "300px", textAlign:"justify", marginTop:"40px" }}>
          </Row>
          <h5>MẠNG XÃ HỘI</h5>
          <Col
            style={{
              fontSize: "30px",
              letterSpacing: "20px",
              marginTop: "30px",
            }}
          >
            <span title="Facebook">
              <a href="#">
                <i
                  className="fa-brands fa-facebook"
                  style={{ color: "blue", cursor: "pointer" }}
                ></i>
              </a>
            </span>
            <span title="Instagram">
              <a href="#">
                <i
                  className="fa-brands fa-instagram"
                  style={{ color: "yellow", cursor: "pointer" }}
                ></i>
              </a>
            </span>
            <span title="Tiktok">
              <a href="#">
                <i
                  className="fa-brands fa-tiktok"
                  style={{ cursor: "pointer", color: "black" }}
                ></i>
              </a>
            </span>
            <span title="Youtube">
              <a href="#">
                <i
                  className="fa-brands fa-youtube"
                  style={{ color: "red", cursor: "pointer" }}
                ></i>
              </a>
            </span>
            <span title="Email">
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
            width: "500px",
            marginTop: "50px"
          }}
          xs
          lg="5"
        >
          <Row>
            <h5>THÔNG TIN LIÊN HỆ</h5>
          </Row>
          <Row>
            <span>  <i className="fa-regular fa-envelope"></i> petshopmew@gmail.com</span>
          </Row>
          <Row>
            <span> 
            <i className="fa-solid fa-globe" style={{ color: "white" }}></i> www.petshopmew.com.vn</span>
          </Row>
          <Row>
            <span><i
              className="fa-solid fa-building"
              style={{ color: "white" }}
            ></i> NHÓM SD-33</span>
          </Row>
          <Row>
           
            <span>  <i
              className="fa-solid fa-location-dot"
              style={{ color: "white" }}
            ></i> Mỹ Đình, Hà Nội</span>
          </Row>

        </Col>
        <Col style={{ lineHeight: "30px", marginTop: "50px" }} xs lg="4">
          <Row>
            <h5>THỜI GIAN LÀM VIỆC</h5>
          </Row>
          <Row>
            <span>Các ngày trong tuần</span>
            
          </Row>
          <Row>
          <span><span> Mở cửa:</span> 07:00 </span>
          <span><span>Đóng cửa:</span> 22:30 </span>
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
            marginTop:"20px"
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

Footer.propTypes = {
  show: PropTypes.bool,
};

export default Footer;
