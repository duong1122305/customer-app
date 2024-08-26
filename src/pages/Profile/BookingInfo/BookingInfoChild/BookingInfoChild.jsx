import { memo, useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Dropdown,
  FloatingLabel,
  Form,
  Pagination,
  Spinner,
  Table,
} from "react-bootstrap";
import callApi from "../../../../utlis/request";
import "./BookingInfoChild.css";
import moment from "moment";
import PropTypes from "prop-types";
import Announcement from "../../../../components/AnnouncementComponent/Announcement";
import AcceptRequest from "../../../../components/AcceptRequestComponent/AcceptRequest";

const BookingInfoChild = ({ conditions }) => {
  const token = sessionStorage.getItem("token");
  const id = JSON.parse(token).id;

  const searchStartDateRef = useRef(null);
  const searchEndDateRef = useRef(null);

  const [searchStartDate, setSearchStartDate] = useState("");
  const [searchEndDate, setSearchEndDate] = useState("");
  const [content, setContent] = useState("");
  const [showAnnounce, setShowAnnounce] = useState(false);
  const [showAccept, setShowAccept] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isSuccessApi, setIsSuccessApi] = useState(false);

  const [groupedBookings, setGroupedBookings] = useState({});
  const [lstBooking, setLstBooking] = useState([
    {
      idBooking: null,
      bookingTime: "",
      status: 0,
      lstBookingDetail: [],
    }
  ]);

  const [dataCancel] = useState({
    idBokingOrDetail: null,
    token: null,
    reason: "Khách hủy",
  });

  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [currentDropdownPage, setCurrentDropdownPage] = useState(1);
  const dropdownsPerPage = 8;

  const filteredGroupedBookings = useMemo(() => {
    return Object.entries(groupedBookings).filter(([date]) => {
      if (!searchStartDate || !searchEndDate) return true;
      if (searchEndDate < searchStartDate) {
        setShowAnnounce(true);
        setContent("Khoảng ngày của bạn đã chọn sai!!!");
        return false;
      }
      const startDate = moment(searchStartDate);
      const endDate = moment(searchEndDate);
      const bookingDate = moment(date, "DD/MM/YYYY");

      return (
        bookingDate.isSameOrAfter(startDate, "day") &&
        bookingDate.isSameOrBefore(endDate, "day")
      );
    });
  }, [groupedBookings, searchStartDate, searchEndDate]);

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
          // Làm phẳng chi tiết đặt chỗ và lọc ra các đặt chỗ null
          const flattenedBookings = result.data.flatMap((booking) =>
            booking.lstBookingDetail
              .filter((detail) => detail !== null) // Lọc ra các chi tiết null
              .map((detail) => ({
                ...booking, // Bao gồm dữ liệu cấp đặt chỗ
                ...detail, // Bao gồm dữ liệu cấp chi tiết
              }))
          );

          // Lọc dựa trên điều kiện
          const filteredData = flattenedBookings.filter((item) =>
            conditions !== undefined ? item.status === conditions : true
          );

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
    if(isSuccessApi){
      getBooking();
    }
  }, [id, isSuccessApi]);

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
  }, [searchStartDate]);

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

  const indexOfLastDropdown = currentDropdownPage * dropdownsPerPage;
  const indexOfFirstDropdown = indexOfLastDropdown - dropdownsPerPage;
  const currentDropdowns = filteredGroupedBookings.slice(
    indexOfFirstDropdown,
    indexOfLastDropdown
  );

  // Hàm xử lý thay đổi trang dropdown
  const handleDropdownPageChange = (pageNumber) => {
    setCurrentDropdownPage(pageNumber);
  };

  const cancelBooking = async (idBooking) => {
    const lastData = {
      ...dataCancel,
      idBokingOrDetail: idBooking,
    };
    try {
      const response = await callApi("Booking/Cancel-BookingDetail-ByGuest", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lastData),
      });
      const result = await response.json();
      if (result.isSuccess === true) {
        setContent("Huỷ dịch vụ thành công <3");
        setShowAnnounce(true);
        setIsSuccessApi(true);
      } else {
        setContent(result.error);
        setShowAnnounce(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAccept = (id) => {
    setSelectedId(id);
    setShowAccept(true);
  };

  const MemoizedAnnouncement = memo(Announcement);
  const MemoizedAcceptRequest = memo(AcceptRequest);

  return (
    <div>
      <div className="d-flex">
        <FloatingLabel label="Từ ngày" className="w-50 mb-2 ms-1">
          <Form.Control
            placeholder="Ngày đặt"
            aria-describedby="basic-addon1"
            type="date"
            ref={searchStartDateRef}
            value={searchStartDate}
            onChange={(e) => setSearchStartDate(e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel label="Tới ngày" className="w-50 mb-2 ms-1">
          <Form.Control
            placeholder="Ngày đặt"
            aria-describedby="basic-addon1"
            type="date"
            ref={searchEndDateRef}
            value={searchEndDate}
            onChange={(e) => setSearchEndDate(e.target.value)}
          />
        </FloatingLabel>
      </div>

      {currentDropdowns.map(([date, bookings]) => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = bookings.slice(indexOfFirstItem, indexOfLastItem);
        // Hàm xử lý thay đổi trang
        const handlePageChange = (pageNumber) => {
          setCurrentPage(pageNumber);
        };
        return (
          <Dropdown key={date} className="d-flex justify-content-center">
            <Dropdown.Toggle
              variant="secondary"
              id="dropdown-basic"
              className="w-100 mb-2"
            >
              {date}
            </Dropdown.Toggle>

            <Dropdown.Menu className="w-100">
              <Table bordered responsive striped>
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
                    <th>Huỷ</th>
                    <th>Huỷ toàn bộ</th>
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
                    currentItems.map((booking) => (
                      <tr key={Math.random()}>
                        <td>{booking.idBooking}</td>
                        <td>{booking.serviceName}</td>
                        <td>{booking.petName}</td>
                        <td>{booking.bookingTime}</td>
                        <td>{booking.startDate}</td>
                        <td>{booking.startTime}</td>
                        <td>{booking.totalPrice} VNĐ</td>
                        <td>{getStatusString(booking.status)}</td>
                        <td>
                          <Button
                            disabled={booking.status === 3 || booking.status === 0 ? true : false}
                            variant="danger"
                            onClick={() => handleAccept(booking.idBookingDetail)}
                          >
                            Huỷ
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
              <div className="d-flex justify-content-center">
                <Pagination>
                  <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  {Array.from(
                    { length: Math.ceil(bookings.length / itemsPerPage) },
                    (_, i) => (
                      <Pagination.Item
                        key={i + 1}
                        active={i + 1 === currentPage}
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </Pagination.Item>
                    )
                  )}
                  <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={
                      currentPage === Math.ceil(bookings.length / itemsPerPage)
                    }
                  />
                </Pagination>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        );
      })}
      <div className="d-flex justify-content-center mt-3">
        <Pagination>
          <Pagination.Prev
            onClick={() => handleDropdownPageChange(currentDropdownPage - 1)}
            disabled={currentDropdownPage === 1}
          />
          {Array.from(
            {
              length: Math.ceil(
                filteredGroupedBookings.length / dropdownsPerPage
              ),
            },
            (_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentDropdownPage}
                onClick={() => handleDropdownPageChange(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            )
          )}
          <Pagination.Next
            onClick={() => handleDropdownPageChange(currentDropdownPage + 1)}
            disabled={
              currentDropdownPage ===
              Math.ceil(filteredGroupedBookings.length / dropdownsPerPage)
            }
          />
        </Pagination>
      </div>
      <MemoizedAnnouncement
        show={showAnnounce}
        content={content}
        onClose={() => setShowAnnounce(false)}
      />
      <MemoizedAcceptRequest
        show={showAccept}
        content="Xác nhận huỷ dịch vụ này ?"
        onClose={() => setShowAccept(false)}
        onAccept={() => cancelBooking(selectedId)}
      />
    </div>
  );
};

BookingInfoChild.propTypes = {
  conditions: PropTypes.number,
};

export default memo(BookingInfoChild);
