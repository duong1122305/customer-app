import { Button, ButtonGroup, FloatingLabel, Form } from "react-bootstrap";
import TableServices from "../TableServices/TableServices";
import { useEffect, useState } from "react";
import "./NotLogin.css";
import callApi from "../../../utlis/request";
import Announcement from "../../../components/AnnouncementComponent/Announcement";
import AcceptRequest from "../../../components/AcceptRequestComponent/AcceptRequest";

const NotLogin = () => {
  const [show, setShow] = useState(false);
  const [lstPet, setLstPet] = useState([]);
  const [selectedServicesForForm, setSelectedServicesForForm] = useState([]);
  const [showRequest, setShowRequest] = useState(false);
  const [showAnnounce, setShowAnnounce] = useState(false);

  const handleShowPopup = () => {
    setShow(true);
  };
  const handleClosePopup = () => {
    setShow(false);
  };

  const handleServicesSelected = (services) => {
    setSelectedServicesForForm(services);
    handleClosePopup();
    console.log(selectedServicesForForm);
  }


  useEffect(() => {
    const getPet = async () => {
      const response = await callApi("PetSpecies/get-all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (result.isSuccess === true) {
        setLstPet(result.data);
      } else {
        console.log(result.error);
      }
    };
    getPet();
  }, []);

  return (
    <div>
      <Form>
        <Button onClick={handleShowPopup}>Danh sách dịch vụ</Button>
        <TableServices
          show={show}
          onClosed={handleClosePopup}
          onServicesSelected={handleServicesSelected}
        />
        <input
          type="hidden"
          name="selectedServices"
          value={JSON.stringify(selectedServicesForForm)}
        />
        <FloatingLabel label="Email">
          <Form.Control type="email" />
        </FloatingLabel>
        <FloatingLabel label="Họ và tên">
          <Form.Control type="text" />
        </FloatingLabel>
        <FloatingLabel label="SĐT">
          <Form.Control type="text" />
        </FloatingLabel>
        <FloatingLabel label="Boss của bạn thuộc">
          <Form.Select>
            <option value={null}>Chọn loại</option>
            {lstPet.map((pet, index) => (
              <option key={index} value={pet.id}>{pet.name}</option>
            ))}
          </Form.Select>
        </FloatingLabel>
        <FloatingLabel label="Tên của boss">
          <Form.Control type="text" />
        </FloatingLabel>
        <FloatingLabel label="Ngày làm dịch vụ">
          <Form.Control type="date" />
        </FloatingLabel>
        <FloatingLabel label="Thời gian làm dịch vụ">
          <Form.Control type="time" />
        </FloatingLabel>
        <ButtonGroup>
          <Button type="submit">Gửi yêu cầu</Button>
          <Button variant="warning" type="reset">
            Chọn lại
          </Button>
        </ButtonGroup>
      </Form>
      <Announcement />
      <AcceptRequest />
    </div>
  );
};

export default NotLogin;
