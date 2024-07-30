import { memo, useEffect, useRef, useState } from "react";
import {
  Button,
  Dropdown,
  FloatingLabel,
  Form,
  Spinner,
  Table,
} from "react-bootstrap";
import callApi from "../../../../utlis/request";
import "./BookingInfoChild.css";
import moment from "moment";
import PropTypes from "prop-types";

const BookingInfoChild = ({ conditions }) => {
  const token = sessionStorage.getItem("token");
  const id = JSON.parse(token).id;

  const searchDateRef = useRef(null);
  const [searchDate, setSearchDate] = useState("");
  const [groupedBookings, setGroupedBookings] = useState({});
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
          const filteredData = result.data.filter((item) => item !== null)
          .filter((item) => conditions !== undefined ? item.status === conditions : true);
          setLstBooking(filteredData);
          const newGroupedBookings = filteredData.reduce((acc, booking) => {
            const date = booking.bookingTime;
            if (!acc[date]) {
              acc[date] = [];
            }
            acc[date].push(booking);
            return acc;
          }, {});
          setGroupedBookings(newGroupedBookings);
          setIsLoading(false);
        }
      } else {
        console.log("none");
        setIsLoading(false);
      }
    };
    getBooking();
  }, [id, conditions]);

  useEffect(() => {
    // Cập nhật groupedBookings khi searchDate thay đổi
    const newGroupedBookings = lstBooking.reduce((acc, booking) => {
      const date = booking.bookingTime;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(booking);
      return acc;
    }, {});
    setGroupedBookings(newGroupedBookings);
  }, [lstBooking, searchDate]);

  // const groupedBookings = lstBooking.reduce((acc, booking) => {
  //   const date = booking.bookingTime;
  //   if (!acc[date]) {
  //     acc[date] = [];
  //   }
  //   acc[date].push(booking);
  //   return acc;
  // }, {});

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

  return (
    <div>
      <FloatingLabel label="Tìm kiếm theo ngày đặt" className="w-50 mb-2 ms-2">
        <Form.Control
          placeholder="Ngày đặt"
          aria-describedby="basic-addon1"
          type="date"
          ref={searchDateRef}
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
      </FloatingLabel>

      {Object.entries(groupedBookings)
        .filter(([date, bookings]) => {
          // Sửa ở đây
          if (!searchDate) return true;
          const formattedSearchDate = moment(searchDate).format("DD/MM/YYYY"); // Chuyển về định dạng DD/MM/YYYY
          return bookings.some(
            (booking) =>
              moment(booking.bookingTime, "DD/MM/YYYY").format("DD/MM/YYYY") ===
              formattedSearchDate
          );
        })
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
              <Table bordered responsive>
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
                              <li key={indexName} className="mb-1">
                                {name}
                              </li>
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

BookingInfoChild.propTypes = {
  conditions: PropTypes.number,
};

export default memo(BookingInfoChild);
