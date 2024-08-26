import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import callApi from "../../utlis/request";
import { useLocation, useParams } from "react-router-dom";
import AcceptRequest from "../../components/AcceptRequestComponent/AcceptRequest";
import Annoucement from "../../components/AnnouncementComponent/Announcement";
import "./BookingNotLogin.css";

const BookingNotLogin = () => {
  const [lstBooking, setLstBooking] = useState([
    {
      idBooking: 0,
      bookingTime: "",
      status: 0,
      lstBookingDetail: [],
    },
  ]);
  const [data] = useState({
    idBokingOrDetail: null,
    token: null,
    reason: "Khách hủy",
  });

  const [showAccept, setShowAccept] = useState(false);
  const [showAnnouce, setShowAnnouce] = useState(false);
  const [content, setContent] = useState("");
  const [idBooking, setIdBooking] = useState(null);

  const location = useLocation();
  const param = location.pathname.split("/");
  var phoneOrEmail = useParams();
  phoneOrEmail = param[param.length - 1];

  const getStatusString = (status) => {
    switch (status) {
      case 0:
        return "Hoàn thành";
      case 1:
        return "Chưa hoàn thành";
      case 2:
        return "Đang làm";
      case 3:
        return "Đã huỷ";
      default:
        return "Không xác định";
    }
  };
const [isTrue,setIsTrue] =useState(false);
  useEffect(() => {
    try {
      if (phoneOrEmail !== null || phoneOrEmail !== undefined) {
        const getBooking = async () => {
          const response = await callApi(
            `Booking/Get-Booking-ByGuest-NoAccount?userOrPhoneNumber=${phoneOrEmail}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const result = await response.json();
          if (result.isSuccess === true) {
            setLstBooking(result.data);
            
          } else {
            setShowAnnouce(true);
            setContent(result.error);
          }
        };
        getBooking();
        if  (isTrue){
          getBooking();
        }
      } else {
        console.error();
      }
    } catch (error) {
      console.error(error.message);
    }
  }, [phoneOrEmail]);

  const handleShowAccept = (id) => {
    setShowAccept(true);
    setIdBooking(id);
    console.log(id);
    
  };

  const handleCancelBookingDetail = async (id) => {
    const newData = {
      ...data,
      idBokingOrDetail: id,
    };
    try {
      const response = await callApi("Booking/Cancel-BookingDetail-ByGuest", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      const result = await response.json();
      if (result.isSuccess) {
        setShowAnnouce(true);
        setContent("Huỷ dịch vụ thành công");
        setIsTrue(true);
      } else {
        setShowAnnouce(true);
        setContent(result.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="ok">
    <h4>Các dịch vụ đã đặt</h4>
    <p style={{fontSize:"11px", color:"red"}}>*Bạn có thể huỷ từng dịch vụ một</p>
      <Table striped bordered>
        <thead>
          <tr>
            <th>STT</th>
            <th>Dịch vụ</th>
            <th>Boss</th>
            <th>Thời gian đặt</th>
            <th>Ngày làm</th>
            <th>Thời gian làm</th>
            <th>Thành tiền</th>
            <th>Trạng thái</th>
            <th>Huỷ</th>
          </tr>
        </thead>
        <tbody>
          {lstBooking.map((item, index) =>
            item.lstBookingDetail.map((item1) => (
              <tr key={Math.random()}>
                <td>{index + 1}</td>
                <td>{item1.serviceName}</td>
                <td>{item1.petName}</td>
                <td>{item.bookingTime}</td>
                <td>{item1.startDate}</td>
                <td>{item1.startTime}</td>
                <td>{item1.totalPrice}</td>
                <td>{getStatusString(item1.status)}</td>
                <td>
                  <Button
                    variant="danger"
                    disabled={
                      item1.status === 3 || item1.status === 0 ? true : false
                    }
                    onClick={() => handleShowAccept(item1.idBookingDetail)}
                  >
                    Huỷ
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <AcceptRequest 
        show={showAccept}
        onClose={() => setShowAccept(false)}
        onAccept={() => handleCancelBookingDetail(idBooking)}
        content="Xác nhận huỷ dịch vụ này ?"
      />
      <Annoucement
        content={content}
        show={showAnnouce}
        onClose={() => setShowAnnouce(false)}
      />
    </div>
  );
};

export default BookingNotLogin;
