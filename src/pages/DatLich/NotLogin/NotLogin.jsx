import { Button, ButtonGroup, FloatingLabel, Form } from "react-bootstrap";
import TableServices from "../TableServices/TableServices";
import { useEffect, useState, useRef } from "react";
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
  const [content, setContent] = useState("");
  const [data, setData] = useState({
    phoneNumber: "",
    email: "",
    nameGuest: "",
    namePet: "",
    genderPet: true,
    speciesId: "",
    idBooking: "",
    voucherId: "",
    lstBookingDetail: [{}],
  });

  //ref
  const nameRef = useRef(null);
  const dateRef = useRef(null);
  const timeRef = useRef(null);
  const bossNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const speRef = useRef(null);


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
  };

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

  const handleBooking = async () => {

    const newData = {
      phoneNumber: phoneRef.current.value,
      email: emailRef.current.value,
      nameGuest: nameRef.current.value,
      namePet: bossNameRef.current.value,
      speciesId: speRef.current.value,
      genderPet: data.genderPet,
      idBooking: 23, // Update if needed
      voucherId: "", // Update if needed
      // Get services and dates from selectedServicesForForm and form fields
      lstBookingDetail: selectedServicesForForm.map((service) => ({
        serviceDetailId: service,
        startDateTime: timeRef.current.value,
        dateBooking: dateRef.current.value
      })),
    };
    console.log(newData);
    
    const response = await callApi(
      "Booking/Create-Booking-For-User-NoAccount",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      }
    );

    const result = await response.json();
    if (result.isSuccess === true) {
      setContent("Đặt lịch thành công!!!");
    } else {
      setContent("Lỗi: " + result.error);
    }
    setShowAnnounce(true);
  };

  const handleShowAccept = (event) => {
    event.preventDefault();
    setShowRequest(true);
  };

  return (
    <div>
      <Form onSubmit={handleShowAccept}>
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
          <Form.Control type="email" ref={emailRef}/>
        </FloatingLabel>
        <FloatingLabel label="Họ và tên">
          <Form.Control type="text" ref={nameRef}/>
        </FloatingLabel>
        <FloatingLabel label="SĐT">
          <Form.Control type="text" ref={phoneRef}/>
        </FloatingLabel>
        <FloatingLabel label="Boss của bạn thuộc">
          <Form.Select ref={speRef}>
            <option value={null} disabled>
              Chọn loại
            </option>
            {lstPet.map((pet, index) => (
              <option key={index} value={pet.id}>
                {pet.name}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>
        <FloatingLabel label="Tên của boss">
          <Form.Control type="text" ref={bossNameRef}/>
        </FloatingLabel>
        <div>
          <label htmlFor="genderPet" className="mb-2">
            Giới
          </label>
          <div>
            <Form.Check
              type="radio"
              label="Đực"
              name="genderPet"
              checked={data.genderPet === true}
              onChange={() => setData({ ...data, genderPet: true })}
              htmlFor="genderPet"
            />
            <Form.Check
              type="radio"
              label="Cái"
              name="genderPet"
              checked={data.genderPet === false}
              onChange={() => setData({ ...data, genderPet: false })}
              htmlFor="genderPet"
            />
          </div>
        </div>
        <FloatingLabel label="Ngày làm dịch vụ">
          <Form.Control type="date" ref={dateRef}/>
        </FloatingLabel>
        <FloatingLabel label="Thời gian làm dịch vụ">
          <Form.Control type="time" ref={timeRef}/>
        </FloatingLabel>
        <ButtonGroup>
          <Button type="submit">Gửi yêu cầu</Button>
          <Button variant="warning" type="reset">
            Chọn lại
          </Button>
        </ButtonGroup>
      </Form>
      <Announcement
        show={showAnnounce}
        content={content}
        onClose={() => setShowAnnounce(false)}
      />
      <AcceptRequest
        show={showRequest}
        onClose={() => setShowRequest(false)}
        content="Xác nhận đặt lịch ?"
        onAccept={handleBooking}
      />
    </div>
  );
};

export default NotLogin;
