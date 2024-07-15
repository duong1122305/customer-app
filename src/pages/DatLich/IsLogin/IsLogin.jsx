import { useEffect, useState } from "react";
import { Button, ButtonGroup, FloatingLabel, Form } from "react-bootstrap";
import TableServices from "../TableServices/TableServices";
import "./IsLogin.css";
import CreatePet from "../../Pet/CreatePet";

const IsLogin = () => {
  const [lstPet, setLstPet] = useState([]);
  const [selectedServicesForForm, setSelectedServicesForForm] = useState([]);
  const [show, setShow] = useState(false);
  const [showPet, setShowPet] = useState(false);
  const handleShowPopup = () => {
    setShow(true);
  };
  const handleClosePopup = () => {
    setShow(false);
  };
  const handleServicesSelected = (services) => {
    setSelectedServicesForForm(services);
    handleClosePopup(); // Đóng modal sau khi chọn
  };
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const result = JSON.parse(token);
    const id = result.id;
    const getPet = async () => {
      const response = await fetch(
        `https://localhost:7039/api/PetManager/get-pet-by-guest?id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resResult = await response.json();
      if (resResult.isSuccess === true) {
        setLstPet(resResult.data);
      } else {
        console.log("Khong co data");
      }
    };
    getPet();
  }, []);
  const handleCreatePet = () => {
    setShowPet(true);
  };
  console.log(selectedServicesForForm);
  return (
    <div>
      <Form className="form_booking">
        <Button onClick={handleShowPopup}>Chọn dịch vụ</Button>
        <TableServices
          show={show}
          onClosed={handleClosePopup}
          onServicesSelected={handleServicesSelected}
        />
        <input type="hidden" name="selectedServices" value={JSON.stringify(selectedServicesForForm)} />
        <FloatingLabel label="Boss hưởng thụ">
          <Form.Select>
            {lstPet.length > 0 ? (
              lstPet.map((pet) => <option key={pet.id}>{pet.name}</option>)
            ) : (
              <option>Bạn chưa thêm Boss của mình rùi !!!</option>
            )}
          </Form.Select>
        </FloatingLabel>
        <FloatingLabel label="Ngày làm dịch vụ">
          <Form.Control type="date" />
        </FloatingLabel>
        <FloatingLabel label="Giờ làm dịch vụ">
          <Form.Control type="time" />
        </FloatingLabel>
        <FloatingLabel label="Bạn có voucher chứ">
          <Form.Control type="text" placeholder="X3aBdcss4" />
        </FloatingLabel>
        <ButtonGroup>
          <Button type="submit">Gửi yêu cầu</Button>
          <Button variant="warning" type="reset">
            Chọn lại
          </Button>
          <Button variant="warning" onClick={handleCreatePet}>
            Thêm boss nè
          </Button>
        </ButtonGroup>
      </Form>
      <CreatePet show={showPet} />
    </div>
  );
};

export default IsLogin;
