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
  const [validated, setValidated] = useState(false);
  const [formError, setFormError] = useState({});

  //ref
  const petIdRef = useRef(null);
  const startDateTimeRef = useRef(null);
  const dateBookingRef = useRef(null);
  const voucherIdRef = useRef(null);

  //get token
  const token = sessionStorage.getItem("token");
  const result = JSON.parse(token);
  const id = result.id;
  const guestName = result.name;

  const [data, setData] = useState({
    listIdServiceDetail: [{}],
    voucherId: null,
    guestId: id,
    guestName: guestName,
  });

  const handleShowPopup = () => {
    setShow(true);
  };
  const handleClosePopup = () => {
    setShow(false);
  };

  const handleServicesSelected = (services, servicesData) => {
    setSelectedServicesForForm(services);
    handleClosePopup();

    // Sử dụng servicesData (đã được lọc) để tính toán giá
    const newPrice = services.reduce((total, serviceId) => {
      const servicePrice =
        servicesData.find((s) => s.serviceDetailId === serviceId)?.price || 0;
      return total + servicePrice;
    }, 0);

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

  const formatDate = (inputDate) => {
      moment(inputDate, "YYYY-MM-DD").format("DD-MM-YYYY");
  };

  const formatTime = (inputTime) => {
    moment(inputTime, "HH:mm").format("HH:mm:ss");
  }

  const handleShowAccept = async () => {
    // Chuyển đổi chuỗi thời gian thành đối tượng Moment
    // const startMoment = moment(startDateTimeRef.current.value, "HH:mm:ss");

    // // Định dạng lại thành chuỗi ISO 8601 (hoặc định dạng mong muốn)
    // const startDateTime = startMoment.format("HH:mm:ss");

    // const dateMoment = moment(dateBookingRef.current.value, "YYYY-MM-DD"); // Giả sử định dạng mong muốn của máy chủ là "YYYY-MM-DD"

    // const dateBooking = dateMoment.format("YYYY-MM-DD");

    const selectedServiceDetails = selectedServicesForForm.map(
      (serviceDetailId) => ({
        petId: parseInt(petIdRef.current.value),
        serviceDetailId,
        startDateTime: formatTime(startDateTimeRef.current.value),
        dateBooking: formatDate(dateBookingRef.current.value),
      })
    );

    const params = {
      ...data,
      listIdServiceDetail: selectedServiceDetails,
      ...(voucherIdRef.current.value && {
        voucherId: voucherIdRef.current.value,
      }),
    };
    console.log(params);
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
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();

      setValidated(true); // Đặt validated để hiển thị lỗi
      return; // Ngăn chặn xử lý tiếp theo nếu biểu mẫu không hợp lệ
    }

    setValidated(true); // Đặt validated thành true khi submit

    // Kiểm tra tất cả các trường và cập nhật formErrors
    setFormError({
      petId: petIdRef.current.value ? "" : "Vui lòng chọn boss !!!",
      dateBooking: dateBookingRef.current.value
        ? ""
        : "Vui lòng chọn ngày làm dịch vụ !!!",
      startTime: startDateTimeRef.current.value
        ? ""
        : "Vui lòng chọn giờ làm dịch vụ !!!",
    });

    setShowAccept(true);
  };

  const handleCloseAccept = () => {
    setShowAccept(false);
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;

    // Loại bỏ lỗi khi người dùng bắt đầu nhập
    setFormError((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  return (
    <div>
      <Form
        className="form_booking"
        onSubmit={handleBooking}
        noValidate
        validated={validated}
      >
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
        <span style={{ color: "red" }} disabled>
          <b>*Mặc định sẽ là boss đầu tiên bạn thêm vào</b>
        </span>
        <FloatingLabel label="Boss hưởng thụ">
          <Form.Select
            ref={petIdRef}
            onChange={onInputChange}
            name="petId"
            isInvalid={!!formError.petId && validated}
            required
          >
            {lstPet.length > 0 ? (
              lstPet.map((pet) => (
                <option key={pet.id} value={pet.id}>
                  {pet.name}
                </option>
              ))
            ) : (
              <option disabled>Bạn chưa thêm Boss của mình rùi !!!</option>
            )}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {formError.petId}
          </Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel label="Ngày làm dịch vụ">
          <Form.Control
            type="date"
            ref={dateBookingRef}
            onChange={onInputChange}
            name="bookingTime"
            isInvalid={!!formError.dateBooking && validated}
            required
          />
          <Form.Control.Feedback type="invalid">
            {formError.dateBooking}
          </Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel label="Giờ làm dịch vụ">
          <Form.Control
            type="time"
            ref={startDateTimeRef}
            onChange={onInputChange}
            name="startTime"
            isInvalid={!!formError.startTime && validated}
            required
          />
          <Form.Control.Feedback type="invalid">
            {formError.startTime}
          </Form.Control.Feedback>
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
