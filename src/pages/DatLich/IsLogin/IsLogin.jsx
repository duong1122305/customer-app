import { useEffect, useRef, useState } from "react";
import { Button, ButtonGroup, FloatingLabel, Form } from "react-bootstrap";
import TableServices from "../TableServices/TableServices";
import "./IsLogin.css";
import CreatePet from "../../Pet/CreatePet";
import { Prev } from "react-bootstrap/esm/PageItem";

const IsLogin = () => {
  const [lstPet, setLstPet] = useState([]);
  const [selectedServicesForForm, setSelectedServicesForForm] = useState([]);
  const [show, setShow] = useState(false);
  const [showPet, setShowPet] = useState(false);

  //ref
  const petIdRef = useRef(null);
  const startDateTimeRef = useRef(null);
  const dateBookingRef = useRef(null);
  const voucherIdRef = useRef(null);

  const token = sessionStorage.getItem("token");
  const result = JSON.parse(token);
  const id = result.id;

  const [lstServiceDetail, setLstServiceDtail] = useState({
    staffId: "",
    petId: 0,
    serviceDetailId: [],
    startDateTime: "",
    dateBooking: "",
  });

  // useEffect(() => {
  //   console.log(lstServiceDetail);
  // }, [JSON.stringify(lstServiceDetail)]);

  const [data, setData] = useState({
    listIdServiceDetail: [{}],
    voucherId: 0,
    guestId: id,
  });

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
  }, [id]);

  const handleCreatePet = () => {
    setShowPet(true);
  };

  const handleBooking = async (event) => {
    event.preventDefault();

    const params = {
      ...data,
      listIdServiceDetail: {
        staffId: "E6DFF21F-781C-40DD-8636-08DC9447F8CE",
        petId: parseInt(petIdRef.current.value),
        startDateTime: startDateTimeRef.current.value, // Lấy giá trị trực tiếp
        dateBooking: dateBookingRef.current.value, // Lấy giá trị trực tiếp
        serviceDetailId:
          selectedServicesForForm.length > 0 ? selectedServicesForForm : [],
      },
    };

    console.log("params:::::::", params);
    try {
      const response = await fetch(
        "https://localhost:7039/api/Booking/Guest-Booking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        }
      );
      const result = await response.json();
      if (result.isSuccess === true) {
        console.log("Booking successful:", result);
      } else {
        console.error("Booking failed:", result.error);
      }
    } catch (error) {
      console.error("Error occurred during booking:", error);
    }
  };

  return (
    <div>
      <Form className="form_booking" onSubmit={handleBooking}>
        <Button onClick={handleShowPopup}>Chọn dịch vụ</Button>
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
        <FloatingLabel label="Boss hưởng thụ">
          <Form.Select ref={petIdRef}>
            <option value={null}>Chọn boss của bạn</option>
            {lstPet.length > 0 ? (
              lstPet.map((pet) => (
                <option key={pet.id} value={pet.id}>
                  {pet.name}
                </option>
              ))
            ) : (
              <option>Bạn chưa thêm Boss của mình rùi !!!</option>
            )}
          </Form.Select>
        </FloatingLabel>
        <FloatingLabel label="Ngày làm dịch vụ">
          <Form.Control type="date" ref={dateBookingRef} />
        </FloatingLabel>
        <FloatingLabel label="Giờ làm dịch vụ">
          <Form.Control type="time" ref={startDateTimeRef} />
        </FloatingLabel>
        <FloatingLabel label="Bạn có voucher chứ">
          <Form.Control
            type="text"
            placeholder="X3aBdcss4"
            ref={voucherIdRef}
          />
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
