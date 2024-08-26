import { useEffect, useState } from "react";
import { Modal, Table, Form, Button, Dropdown } from "react-bootstrap";
import PropTypes from "prop-types";
import callApi from "../../../utlis/request";
import "./TableServices.css";

const TableServices = ({ show, onClosed, onServicesSelected }) => {
  const [lstServices, setLstServices] = useState([{
    serviceName: "",
    serviceDetails: []
  }]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCheckboxChange = (serviceId) => {
    setSelectedServices((prevSelected) => {
      if (prevSelected.includes(serviceId)) {
        return prevSelected.filter((id) => id !== serviceId);
      } else {
        return [...prevSelected, serviceId];
      }
    });
  };

  const filteredServices = searchQuery
  ? lstServices
      .map((service) => ({
        ...service,
        serviceDetails: service.serviceDetails.filter((detail) =>
          detail.description.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }))
      .filter((service) => service.serviceDetails.length > 0) // Only keep services with matching details
  : lstServices;
  
  useEffect(() => {
    const handleServices = async () => {
      const response = await callApi("ServicesDetail/groupByServiceName", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();
        setLstServices(result);
      }
    };
    handleServices();
  }, []);

  return (
    <div className="table_services">
      <Modal
        show={show}
        onHide={onClosed}
        centered
        className="custom_modal_width"
      >
        <Modal.Header closeButton className="modal_header">
          Danh sách dịch vụ
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            className="mb-2"
            type="text"
            placeholder="Tìm kiếm ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {filteredServices.map((services, index) => (
            <Dropdown key={index}>
              <Dropdown.Toggle
                variant="secondary"
                id="dropdown-basic"
                className="w-100 mb-2"
              >
                {services.serviceName}
              </Dropdown.Toggle>
              <Dropdown.Menu className="w-100">
                <Table striped bordered style={{width:"95%", justifySelf:"center"}}>
                  <thead>
                    <tr>
                      <td>STT</td>
                      <td>Kiểu</td>
                      <td>Giá</td>
                      <td>Khoảng thời gian làm (dự kiến)</td>
                      <td>Chọn</td>
                    </tr>
                  </thead>
                  <tbody>
                    {services.serviceDetails.map((serviceDetail, stt) => (
                      <tr key={stt}>
                        <td>{stt + 1}</td>
                        <td>{serviceDetail.description}</td>
                        <td>{serviceDetail.price}</td>
                        <td>{serviceDetail.duration}</td>
                        <td>
                          <Form.Check
                            checked={selectedServices.includes(serviceDetail.id)}
                            onChange={() => handleCheckboxChange(serviceDetail.id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Dropdown.Menu>
            </Dropdown>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              // Lọc lấy serviceDetails từ lstServices dựa trên selectedServices
              const selectedServiceDetails = lstServices.flatMap(
                (service) =>
                  service.serviceDetails.filter((detail) =>
                    selectedServices.includes(detail.serviceDetailId) // Sử dụng serviceDetailId
                  )
              );

              onServicesSelected(selectedServices, selectedServiceDetails); // Truyền cả selectedServiceDetails
            }}
          >
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

TableServices.propTypes = {
  show: PropTypes.bool,
  onClosed: PropTypes.func,
  onServicesSelected: PropTypes.func,
};

export default TableServices;
