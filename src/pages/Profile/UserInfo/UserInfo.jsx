import { Col, Container, Dropdown, Form, Image, Row } from "react-bootstrap";
import "./UserInfo.css";
import { useEffect, useState } from "react";

const UserInfo = () => {
  const [info, setInfo] = useState({
    name: "",
    gender: true,
    phoneNumber: "",
    email: "",
    avatarUrl: "",
    address: "",
  });

  const [readonly, setReadonly] = useState(true);
  const [nameBtn, setNameBtn] = useState("Thay đổi thông tin");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const result = JSON.parse(token);

    if (token) {
      const id = result.id;
      try {
        const findInfo = async () => {
          const response = await fetch(
            `https://localhost:7039/api/GuestManager/find-by-id?id=${id}`,
            {
              method: "GET",
            }
          );
          const responseResult = await response.json();
          if (responseResult.isSuccess === true) {
            const data = responseResult.data;
            const address = data.address;

            // Bước 1: Xóa dãy số đầu tiên và dấu ! đầu tiên
            const cleanedAddress = address.replace(/^0\d+!/, "");

            // Bước 2: Thay dấu ! thứ hai bằng dấu ,
            let count = 0;
            const finalAddress = cleanedAddress.replace(/!/g, (match) => {
              count++;
              return count === 1 ? "," : match; // Chỉ thay thế dấu ! đầu tiên sau khi đã xóa dãy số
            });

            console.log("ok");
            setInfo({
              name: data.name,
              gender: data.gender,
              phoneNumber: data.phoneNumber,
              email: data.email,
              avatarUrl: data.avatarUrl,
              address: finalAddress,
            });
            console.log(info);
          }
        };
        findInfo();
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("co loi");
    }
  }, [setInfo]);

  const onBtnClick = () => {
    setReadonly(false);
    setNameBtn("Xác nhận");
  };

  return (
    <Container className="container">
      <Row className="row-1">
        <h4>THÔNG TIN 🤵</h4>
        <button className="btn-updateInfo" onClick={onBtnClick}>
          {nameBtn}
        </button>
      </Row>
      <hr />
      <Row className="row-2">
        <Col style={{ border: "1px solid black" }} className="col-1">
          <Row>
            <h6 style={{ color: "gray" }}>THÔNG TIN NGƯỜI DÙNG</h6>
            <p style={{ fontSize: "13px", color: "gray" }}>
              Bạn có thể thay đổi thông tin của mình trong các mục bên dưới.
            </p>
          </Row>
          <Row>
            <div className="input-mt">
              <label htmlFor="">Họ tên</label>
              <Form.Control
                type="text"
                style={{ marginTop: "5px" }}
                value={info.name}
                disabled={readonly}
                onChange={(e) => setInfo({ ...info, name: e.target.value })}
              />
            </div>
            <div className="input-mt">
              <label>Địa chỉ</label>
              <Form.Control
                type="text"
                placeholder="Địa chỉ của bạn"
                style={{ marginTop: "15px" }}
                value={info.address}
                disabled={readonly}
                onChange={(e) => setInfo({ ...info, address: e.target.value })}
              />
            </div>
            <div className="input-mt">
              <label htmlFor="">SĐT</label>
              <Form.Control
                type="text"
                className="in-mt"
                value={info.phoneNumber}
                disabled={readonly}
                onChange={(e) => setInfo({ ...info, phoneNumber: e.target.value })}
              />
            </div>
            <div className="input-mt">
              <label>Giới tính</label>
              <div style={{ display: "flex" }} className="in-mt">
                <Form.Check
                  type="radio"
                  label={"Nam"}
                  htmlFor="gender"
                  name="gender"
                  checked={info.gender === true}
                  onChange={() => setInfo({ ...info, gender: true })}
                  disabled={readonly}
                />
                <Form.Check
                  type="radio"
                  label={"Nữ"}
                  name="gender"
                  checked={info.gender === false}
                  onChange={() => setInfo({ ...info, gender: false })}
                  style={{ marginLeft: "10px" }}
                  htmlFor="gender"
                  disabled={readonly}
                />
              </div>
            </div>
          </Row>
        </Col>
        <Col style={{ border: "1px solid black" }}>
          <div>
            <h5>Ảnh đại diện</h5>
            <div className="container-avatar">
              <Image
                src={
                  info.avatarUrl == null
                    ? "https://dersteira.at/img/nh-nn-trng-fb.jpg"
                    : info.avatarUrl
                }
                roundedCircle
                className="avatar"
              />
              <input className="btn-upload" type="file"></input>
            </div>
          </div>
          <hr style={{ marginTop: "50px" }} />
          <div className="info">
            <h5 className="title-info">THÔNG TIN CỦA BẠN</h5>
            <div>
              <div className="text-infomation">
                <label htmlFor="">Email:</label>
                <p>{info.email}</p>
              </div>
              <div className="text-infomation">
                <label htmlFor="">Họ và tên:</label>
                <p>{info.name}</p>
              </div>
              <div className="text-infomation">
                <label htmlFor="">SĐT:</label>
                <p>{info.phoneNumber}</p>
              </div>
              <div className="text-infomation">
                <label htmlFor="">Địa chỉ:</label>
                <p>{info.address}</p>
              </div>
              <div className="text-infomation">
                <label htmlFor="">Giới tính:</label>
                <p>{info.gender == true ? "Nam" : "Nữ"}</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserInfo;
