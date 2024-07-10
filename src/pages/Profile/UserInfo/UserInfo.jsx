import { Col, Container, Dropdown, Form, Image, Row } from "react-bootstrap";
import "./UserInfo.css";

const UserInfo = () => {
  return (
    <Container>
      <Row className="row-1">
        <h4>THÔNG TIN 🤵</h4>
        <button className="btn-updateInfo">Xác nhận</button>
      </Row>
      <hr />
      <Row>
        <Col style={{ border: "1px solid black" }} className="col-1">
          <Row>
            <h6 style={{ color: "gray" }}>THÔNG TIN NGƯỜI DÙNG</h6>
            <p style={{ fontSize: "13px", color: "gray" }}>
              Bạn có thể thay đổi thông tin của mình trong các mục bên dưới.
            </p>
          </Row>
          <Row>
            <div className="mt-3">
              <label htmlFor="">Họ tên</label>
              <Form.Control
                type="text"
                style={{ width: "30%", marginTop: "5px" }}
              />
            </div>
            <div className="mt-4">
              <label>Địa chỉ</label>
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                }}
              >
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    style={{
                      backgroundColor: "gray",
                      border: "none",
                      marginRight: "40px",
                    }}
                  >
                    Tỉnh
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    style={{
                      backgroundColor: "gray",
                      border: "none",
                      marginRight: "40px",
                    }}
                  >
                    Huyện
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    style={{ backgroundColor: "gray", border: "none" }}
                  >
                    Phường, Xã
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <Form.Control
                type="text"
                placeholder="Số nhà"
                style={{ marginTop: "15px" }}
              />
            </div>
            <div className="mt-5">
              <label htmlFor="">SĐT</label>
              <Form.Control type="text" style={{ marginTop: "5px" }} />
            </div>
            <div className="mt-5">
              <label>Giới tính</label>
              <div style={{ display: "flex", marginTop: "10px" }}>
                <Form.Check type="radio" label={"Nam"} htmlFor="gender" />
                <Form.Check
                  type="radio"
                  label={"Nữ"}
                  style={{ marginLeft: "10px" }}
                  htmlFor="gender"
                />
              </div>
            </div>
          </Row>
        </Col>
        <Col style={{ border: "1px solid black" }}>
          <div>
            <h5>Ảnh đại diện</h5>
            <div className="container-avatar">
                <Image src="data:image/jpeg;base64,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"
                    roundedCircle
                    className="avatar"
                />
                <input className="btn-upload" type="file"></input>
            </div>
          </div>
          <div>

          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserInfo;
