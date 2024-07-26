import { Pagination, Spinner, Tab, Table, Tabs } from "react-bootstrap";
import "./BookingInfo.css";
import { useEffect, useState } from "react";
import callApi from "../../../utlis/request";

const BookingInfo = () => {
  const [lstBooking, setLstBooking] = useState([]);
  const [lstServiceName, setLstServiceName] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const token = sessionStorage.getItem("token");
  const id = JSON.parse(token).id;

  const totalPages = Math.ceil(lstBooking.length / itemsPerPage);
  
  const currentItems = lstBooking.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
      if (result.isSuccess === true && Array.isArray(result.data)) {
        setLstBooking(result.data);
        const serName = result.data.map(item => item.serviceName);
        setLstServiceName(serName);
        setLoading(false);
      } else {
        setLoading(true);
        console.log("not data");
      }
    };
    getBooking();
  }, []);

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
      <Tabs defaultActiveKey="home" id="fill-tab-example" className="mb-3" fill>
        <Tab eventKey="home" title="Tất cả">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên dịch vụ</th>
                <th>Boss hưởng thụ</th>
                <th>Ngày đặt</th>
                <th>Ngày làm</th>
                <th>Giờ làm</th>
                <th>Thành tiền</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td>
                    <Spinner animation="border" />
                  </td>
                </tr>
              ) : (
                currentItems.map((booking, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <ul>
                        {lstServiceName.map((name, indexName) => (
                          <p key={indexName}>{name}</p>
                        ))}
                      </ul>
                    </td>
                    <td>{booking.petName}</td>
                    <td>{booking.bookingTime}</td>
                    <td>{booking.startDate}</td>
                    <td>{booking.startTime}</td>
                    <td>{booking.totalPrice}</td>
                    <td>{getStatusString(booking.status)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
          <Pagination>
            <Pagination.First onClick={() => handlePageChange(1)} />
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {/* Hiển thị các nút số trang */}
            {[...Array(totalPages)].map((_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last onClick={() => handlePageChange(totalPages)} />
          </Pagination>
        </Tab>
        <Tab eventKey="profile" title="Chuẩn bị">
          Tab content for Profile
        </Tab>
        <Tab eventKey="longer-tab" title="Đã xong">
          Tab content for Loooonger Tab
        </Tab>
      </Tabs>
    </div>
  );
};

export default BookingInfo;
