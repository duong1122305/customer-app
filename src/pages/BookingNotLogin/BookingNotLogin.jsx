import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import callApi from "../../utlis/request";
import { useLocation, useParams } from "react-router-dom";

const BookingNotLogin = () => {
  const [lstBooking, setLstBooking] = useState([
    {
      idBooking: 0,
      bookingTime: "",
      status: 0,
      lstBookingDetail: [],
    },
  ]);
  const location = useLocation();
  const param = location.pathname.split('/');
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
            console.log(result.error);
          }
        };
        getBooking();
      } else {
        console.error();
      }
    } catch (error) {
      console.error(error.message);
    }
  }, [phoneOrEmail]);

  return (
    <div>
      <Table>
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
                <td>{getStatusString(item.status)}</td>
                <td>
                  <Button variant="danger" disabled={item.status === 3 || item.status === 0 ? true : false}>Huỷ</Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};


export default BookingNotLogin;
