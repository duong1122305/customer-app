import { memo, useEffect, useState } from "react";
import { Button, Dropdown, Spinner, Table } from "react-bootstrap";
import callApi from "../../../../utlis/request";

const BookingInfoChild = () => {
  const token = sessionStorage.getItem("token");
  const id = JSON.parse(token).id;
  const [lstBooking, setLstBooking] = useState([
    {
      petName: "",
      serviceName: [],
      serviceId: [],
      bookingTime: "",
      startDate: "",
      endDate: "",
      startTime: "",
      totalPrice: 0,
      status: 0,
    },
  ]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getBooking = async () => {
      const response = await callApi(
        `Booking/GetBookingByGuest?idGuest=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      if (result.isSuccess === true) {
        if (result.data.length > 0) {
          setLstBooking(result.data.filter((item) => item !== null));
          setIsLoading(false);
        }
      } else {
        console.log("none");
        setIsLoading(false);
      }
    };
    getBooking();
  }, [id]);

  const groupedBookings = lstBooking.reduce((acc, booking) => {
    const date = booking.bookingTime;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(booking);
    return acc;
  }, {});

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

  console.log(lstBooking);
  return (
    <div>
      {Object.entries(groupedBookings)
        .filter((item) => item != null)
        .map(([date, bookings]) => (
          <Dropdown key={date} className="d-flex justify-content-center">
            <Dropdown.Toggle
              variant="secondary"
              id="dropdown-basic"
              className="w-100 mb-2"
            >
              {date}
            </Dropdown.Toggle>

            <Dropdown.Menu className="w-100">
              <Table bordered>
                <thead className="text-center">
                  <tr>
                    <th>STT</th>
                    <th>Tên dịch vụ</th>
                    <th>Boss</th>
                    <th>Thời gian đặt</th>
                    <th>Ngày làm</th>
                    <th>Thời gian làm</th>
                    <th>Thành tiền</th>
                    <th>Trạng thái</th>
                    <th>Sửa/Huỷ</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {isLoading ? (
                    <tr>
                      <td colSpan="6">
                        <Spinner animation="border" />
                      </td>
                    </tr>
                  ) : (
                    bookings.map((booking, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <ol className="text-start">
                            {booking.serviceName.map((name, indexName) => (
                              <li key={indexName} className="mb-1">{name}</li>
                            ))}
                          </ol>
                        </td>
                        <td>{booking.petName}</td>
                        <td>{booking.bookingTime}</td>
                        <td>{booking.startDate}</td>
                        <td>{booking.startTime}</td>
                        <td>{booking.totalPrice}</td>
                        <td>{getStatusString(booking.status)}</td>
                        <td>
                          <Button>Sửa</Button>
                          <Button variant="danger">Huỷ</Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Dropdown.Menu>
          </Dropdown>
        ))}
    </div>
  );
};

export default memo(BookingInfoChild);
