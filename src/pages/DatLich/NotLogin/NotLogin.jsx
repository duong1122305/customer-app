import { Button, ButtonGroup, FloatingLabel, Form } from "react-bootstrap";
import TableServices from "../TableServices/TableServices";
import { useEffect, useState, useRef } from "react";
import "./NotLogin.css";
import callApi from "../../../utlis/request";
import Announcement from "../../../components/AnnouncementComponent/Announcement";
import AcceptRequest from "../../../components/AcceptRequestComponent/AcceptRequest";
import moment from "moment";

const NotLogin = () => {
  const [show, setShow] = useState(false);
  const [lstPet, setLstPet] = useState([]);
  const [selectedServicesForForm, setSelectedServicesForForm] = useState([]);
  const [showRequest, setShowRequest] = useState(false);
  const [showAnnounce, setShowAnnounce] = useState(false);
  const [content, setContent] = useState("");
  const [lstVoucher, setLstVoucher] = useState([]);
  const [price, setPrice] = useState(0);
  const [data, setData] = useState({
    phoneNumber: "",
    email: "",
    nameGuest: "",
    namePet: "",
    genderPet: true,
    speciesId: "",
    idBooking: "",
    voucherId: null,
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
  const voucherIdRef = useRef(null);

  const handleShowPopup = () => {
    setShow(true);
  };
  const handleClosePopup = () => {
    setShow(false);
  };

  const handleServicesSelected = (services, servicesData) => {
    setSelectedServicesForForm(services);
    handleClosePopup();

    const newPrice = services.reduce((total, serviceId) => {
      const servicePrice =
        servicesData.find((s) => s.serviceDetailId === serviceId)?.price || 0;
      return total + servicePrice;
    }, 0);

    setPrice(newPrice);
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

    const getVoucher = async () => {
      const response = await callApi(
        `Booking/List-Voucher-Can-Apply?totalPrice=${price}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      if (result.isSuccess === true) {
        setLstVoucher(result.data);
      } else {
        console.log(result.error);
      }
    };

    getPet();
    getVoucher();
  }, [price]);

  const formatTime = (time) => {
    if(moment(time, "HH:mm", true).isValid()){
      const finish = moment(time, "HH:mm").format("HH:mm:ss");

      return finish;
    }
    return moment(time, "HH:mm:ss").format("HH:mm:ss");
  }

  const formatDate = (date) => {
    const parsedDate = moment(date, ["MM/DD/YYYY", "YYYY-MM-DD"], true);
    if(parsedDate.isValid()){
      return parsedDate.format("YYYY-MM-DD");
    }

    return moment(date, "YYYY-MM-DD").format("YYYY-MM-DD");
  }

  const handleBooking = async () => {
    // const startMoment = moment(timeRef.current.value, "HH:mm:ss");

    // const startDatetime = startMoment.format("HH:mm:ss");

    // const dateMoment = moment(dateRef.current.value, "YYYY-MM-DD"); // Giả sử định dạng mong muốn của máy chủ là "YYYY-MM-DD"

    // const dateBooking = dateMoment.format("YYYY-MM-DD");

    const newData = {
      phoneNumber: phoneRef.current.value,
      email: emailRef.current.value,
      nameGuest: nameRef.current.value,
      namePet: bossNameRef.current.value,
      speciesId: speRef.current.value,
      genderPet: data.genderPet,
      idBooking: 23, // Update if needed
      ...(voucherIdRef.current.value && {
        voucherId: voucherIdRef.current.value,
      }), // Update if needed
      // Get services and dates from selectedServicesForForm and form fields
      lstBookingDetail: selectedServicesForForm.map((service) => ({
        serviceDetailId: service,
        startDateTime: formatTime(timeRef.current.value),
        dateBooking: formatDate(dateRef.current.value),
        endDateTime: "00:00:00",
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
          <Form.Control type="email" ref={emailRef} />
        </FloatingLabel>
        <FloatingLabel label="Họ và tên">
          <Form.Control type="text" ref={nameRef} />
        </FloatingLabel>
        <FloatingLabel label="SĐT">
          <Form.Control type="text" ref={phoneRef} />
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
          <Form.Control type="text" ref={bossNameRef} />
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
          <Form.Control type="date" ref={dateRef} />
        </FloatingLabel>
        <FloatingLabel label="Thời gian làm dịch vụ">
          <Form.Control type="time" ref={timeRef} />
        </FloatingLabel>
        <FloatingLabel label="Voucher">
          <Form.Select ref={voucherIdRef}>
            {lstVoucher.length > 0 ? (
              lstVoucher.map((vouchers, index) => (
                <option key={index} value={vouchers.id}>
                  {vouchers.voucherName}
                </option>
              ))
            ) : (
              <option disabled>Không có voucher có thể áp dụng</option>
            )}
          </Form.Select>
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
