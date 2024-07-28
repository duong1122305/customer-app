import { useEffect, useRef, useState } from "react";
import { Button, ButtonGroup, FloatingLabel, Form } from "react-bootstrap";
import moment from "moment";
import TableServices from "../TableServices/TableServices";
import "./IsLogin.css";
import CreatePet from "../../Pet/CreatePet";
import Announcement from "../../../components/AnnouncementComponent/Announcement";
import AcceptRequest from "../../../components/AcceptRequestComponent/AcceptRequest";
import callApi from "../../../utlis/request";

const IsLogin = () => {
  //state
  const [lstPet, setLstPet] = useState([]);
  const [selectedServicesForForm, setSelectedServicesForForm] = useState([]);
  const [show, setShow] = useState(false);
  const [showPet, setShowPet] = useState(false);
  const [showAnnoucement, setShowAnnoucement] = useState(false);
  const [content, setContent] = useState("");
  const [ifTrue, setIfTrue] = useState(false);
  const [showAccept, setShowAccept] = useState(false);
  const [lstVoucher, setLstVoucher] = useState([]);
  const [price, setPrice] = useState(0);
  //ref
  const petIdRef = useRef(null);
  const startDateTimeRef = useRef(null);
  const dateBookingRef = useRef(null);
  const voucherIdRef = useRef(null);

  //get token
  const token = sessionStorage.getItem("token");
  const result = JSON.parse(token);
  const id = result.id;

  // const [lstServiceDetail, setLstServiceDtail] = useState([
  //   {
  //     staffId: "",
  //     petId: 0,
  //     serviceDetailId: [],
  //     startDateTime: "",
  //     dateBooking: "",
  //   },
  // ]);

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

  const handleServicesSelected = (services, servicesData) => {
    setSelectedServicesForForm(services);
    handleClosePopup(); // Đóng modal sau khi chọn

    const newPrice = services.reduce((total, serviceId) => {
      const servicePrice =
        servicesData.find((s) => s.serviceDetailId === serviceId)?.price || 0;
      return total + servicePrice;
    }, 0);
    console.log(newPrice);
    setPrice(newPrice);
  };

  const getDataFromChild = (dataChild) => {
    setIfTrue(dataChild);
  };

  useEffect(() => {
    const getPet = async () => {
      const response = await callApi(`PetManager/get-pet-by-guest?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resResult = await response.json();
      if (resResult.isSuccess === true) {
        setLstPet(resResult.data);
      } else {
        console.log("Khong co data");
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
        console.log("ok");
      } else {
        console.log(result.error);
      }
    };

    getPet();
    getVoucher();
    if (ifTrue) {
      getPet();
    }
  }, [id, ifTrue, price]);

  const handleCreatePet = () => {
    setShowPet(true);
  };

  const handleShowAccept = async () => {
    // Chuyển đổi chuỗi thời gian thành đối tượng Moment
    const startMoment = moment(startDateTimeRef.current.value, "HH:mm:ss");

    // Định dạng lại thành chuỗi ISO 8601 (hoặc định dạng mong muốn)
    const startDateTime = startMoment.format("HH:mm:ss");

    const selectedServiceDetails = selectedServicesForForm.map(
      (serviceDetailId) => ({
        staffId: "E6DFF21F-781C-40DD-8636-08DC9447F8CE", // Thay bằng staffId thực tế
        petId: parseInt(petIdRef.current.value),
        serviceDetailId,
        startDateTime: startDateTime,
        dateBooking: dateBookingRef.current.value,
      })
    );

    const params = {
      ...data,
      listIdServiceDetail: selectedServiceDetails,
      ...(voucherIdRef.current.value && { voucherId: voucherIdRef.current.value }),
    };

    try {
      const response = await callApi("Booking/Guest-Booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      console.log("ok:", JSON.stringify(params));
      const result = await response.json();
      if (result.isSuccess === true) {
        setShowAnnoucement(true);
        setContent("Bạn đã đặt lịch thành công!!!");
        setShowAccept(false);
      } else {
        setShowAnnoucement(true);
        setContent(result.error);
      }
    } catch (error) {
      console.error("Error occurred during booking:", error);
    }
  };

  const handleBooking = (event) => {
    event.preventDefault();
    setShowAccept(true);
  };

  const handleCloseAccept = () => {
    setShowAccept(false);
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
          <Form.Select ref={voucherIdRef}>
            {lstVoucher.map((vouchers, index) => (
              <option key={index} value={vouchers.id}>
                {vouchers.voucherName}
              </option>
            ))}
          </Form.Select>
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
      <CreatePet
        show={showPet}
        onHide={() => setShowPet(false)}
        sendData={getDataFromChild}
      />
      <Announcement
        show={showAnnoucement}
        content={content}
        onClose={() => setShowAnnoucement(false)}
      />
      <AcceptRequest
        show={showAccept}
        onClose={handleCloseAccept}
        onAccept={handleShowAccept}
        content="Xác nhận đặt lịch"
      />
    </div>
  );
};

export default IsLogin;
