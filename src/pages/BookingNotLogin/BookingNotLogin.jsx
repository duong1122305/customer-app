import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import callApi from "../../utlis/request";
import PropTypes from "prop-types";

const BookingNotLogin = ({ phoneOrEmail, show, close }) => {
  const [lstBooking, setLstBooking] = useState([
    {
      idBooking: 0,
      bookingTime: "",
      status: 0,
      lstBookingDetail: [],
    },
  ]);

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
            console.log("ok");
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
      <Modal show={show} onHide={close}>
        <Modal.Body>
          <Table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên dịch vụ</th>
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
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item1.serviceName}</td>
                    <td>{item1.petName}</td>
                    <td>{item.bookingTime}</td>
                    <td>{item1.startDate}</td>
                    <td>{item1.startTime}</td>
                    <td>{item1.totalPrice}</td>
                    <td>{item.status}</td>
                    <td>
                      <Button variant="danger">Huỷ</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </div>
  );
};

BookingNotLogin.propTypes = {
  phoneOrEmail: PropTypes.string.isRequired,
  show: PropTypes.func,
  close: PropTypes.func,
};

export default BookingNotLogin;
