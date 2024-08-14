import {
  Col,
  Container,
  Form,
  Image,
  Row,
  FloatingLabel,
} from "react-bootstrap";
import "./UserInfo.css";
import { useEffect, useRef, useState } from "react";
import callApi from "../../../utlis/request";
import Announcement from "../../../components/AnnouncementComponent/Announcement";

const UserInfo = () => {
  const [info, setInfo] = useState({
    id: "",
    name: "",
    gender: true,
    phoneNumber: "",
    email: "",
    avatarUrl: "",
    address: "",
  });

  const [readonly, setReadonly] = useState(true);
  const [nameBtn, setNameBtn] = useState("Đổi thông tin");
  const [count, setCount] = useState(0);
  const [provinces, setProvince] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [content, setContent] = useState("");
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showButton, setShowButton] = useState(false);

  //ref
  const homeRef = useRef(null);
  const phoneRef = useRef(null);
  const nameRef = useRef(null);

  //value
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

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const result = JSON.parse(token);

    if (token) {
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
            const data = responseResult.data;
            const address = data.address;

            // Bước 1: Xóa dãy số đầu tiên và dấu ! đầu tiên
            const cleanedAddress = address.replace(/^\d+!/, "");

            // Bước 2: Thay dấu ! thứ hai bằng dấu ,
            let count = 0;
            const finalAddress = cleanedAddress.replace(/!/g, (match) => {
              count++;
              return count === 1 ? ", " : match; // Chỉ thay thế dấu ! đầu tiên sau khi đã xóa dãy số
            });

            setInfo({
              id: id,
              name: data.name,
              gender: data.gender,
              phoneNumber: data.phoneNumber,
              email: data.email,
              avatarUrl: data.avatarUrl,
              address: finalAddress,
            });
          }
        };

        findInfo();
        if (success) {
          findInfo();
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error();
    }

    const getProvinces = async () => {
      const response = await fetch("https://esgoo.net/api-tinhthanh/1/0.htm", {
        method: "GET",
      });
      if (response.ok) {
        var result = await response.json();
        setProvince(result.data);
      }
    };

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

    getProvinces();
    getDistricts();
    getWards();
  }, [selectedProvinces, selectedDistricts, success]);

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

  const onBtnClick = () => {
    if (count === 0) {
      setCount(count + 1);
      setReadonly(false);
      setNameBtn("Xác nhận");
      setShowButton(true);
    } else {
      const updateInfo = async () => {
        const updatedInfo = {
          ...info,
          name: nameRef.current.value,
          phoneNumber: phoneRef.current.value,
          address: `${selectedWard.id}!${homeRef.current.value}!${selectedWard.name}, ${selectedDistricts.name}, ${selectedProvinces.name}`,
        };
        const response = await callApi("GuestManager/update-guest", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedInfo),
        });
        const result = await response.json();
        if (result.isSuccess === true) {
          setShow(true);
          setContent("Cập nhật thông tin thành công.");
          setSuccess(true);
          setReadonly(true);
          setShowButton(false);
          setNameBtn("Đổi thông tin");
          setCount(0);
        } else {
          setContent("Có lỗi khi cập nhật thông tin: ", result.error);
        }
      };
      updateInfo();
    }
  };

  const huyUpdate = () => {
    setShow(false);
    setShowButton(false);
    setCount(0);
    setReadonly(true);
    setNameBtn("Đổi thông tin");
  };

  return (
    <Container className="container">
      <Row className="row-1 mt-2">
        <h4>THÔNG TIN 🤵</h4>
        <button className="btn-updateInfo" onClick={onBtnClick}>
          {nameBtn}
        </button>
        <button
          style={showButton ? { display: "block" } : { display: "none" }}
          className="btn-huy"
          onClick={huyUpdate}
        >
          Huỷ
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
                ref={nameRef}
              />
            </div>
            <div className="input-mt">
              <label className="mb-2">Địa chỉ</label>
              <FloatingLabel label="Số nhà, Đường" className="mb-2">
                <Form.Control disabled={readonly} ref={homeRef} />
              </FloatingLabel>
              <FloatingLabel label="Tỉnh/Thành" className="mb-2">
                <Form.Select
                  onChange={handleProvincesChange}
                  disabled={readonly}
                >
                  {provinces.map((pro, index) => (
                    <option key={index} value={pro.id}>
                      {pro.full_name}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
              <FloatingLabel label="Quận/huyện" className="mb-2">
                <Form.Select
                  onChange={handleDistrictsChange}
                  disabled={readonly}
                >
                  {districts.map((dis, index) => (
                    <option key={index} value={dis.id}>
                      {dis.full_name}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
              <FloatingLabel label="Xã/phường">
                <Form.Select disabled={readonly} onChange={handleWardChange}>
                  {wards.map((war, index) => (
                    <option key={index} value={war.id}>
                      {war.full_name}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </div>
            <div className="input-mt">
              <label htmlFor="">SĐT</label>
              <Form.Control
                type="text"
                className="in-mt"
                value={info.phoneNumber}
                disabled={readonly}
                onChange={(e) =>
                  setInfo({ ...info, phoneNumber: e.target.value })
                }
                ref={phoneRef}
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
              <input
                className="btn-upload"
                type="file"
                disabled={readonly}
              ></input>
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
      <Announcement
        content={content}
        show={show}
        onClose={() => setShow(false)}
      />
    </Container>
  );
};

export default UserInfo;
