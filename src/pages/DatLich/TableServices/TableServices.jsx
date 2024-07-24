import { useEffect, useState } from "react";
import { Modal, Table, Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import callApi from "../../../utlis/request";

const TableServices = ({ show, onClosed, onServicesSelected }) => {
  const [lstServices, setLstServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const handleCheckboxChange = (serviceId) => {
    setSelectedServices((prevSelected) => {
      if (prevSelected.includes(serviceId)) {
        return prevSelected.filter((id) => id !== serviceId); // Bỏ chọn nếu đã được chọn
      } else {
        return [...prevSelected, serviceId]; // Thêm vào nếu chưa được chọn
      }
    });
  };
  useEffect(() => {
    const handleServices = async () => {
      const response = await callApi("ServicesDetail/getServiceName", {
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
    <div>
      <Modal show={show} onHide={onClosed} centered>
        <Modal.Header closeButton></Modal.Header>
        <Table responsive striped bordered style={{ width: "500px" }}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Dịch vụ</th>
              <th>Giá tiền</th>
              <th>Thời gian làm</th>
              <th>Mô tả</th>
              <th>Chọn</th>
            </tr>
          </thead>
          <tbody>
            {lstServices.length > 0 ? (
              lstServices.map((services, index) => (
                <tr key={Math.random()}>
                  <td>{index + 1}</td>
                  <td>{services.serviceName}</td>
                  <td>{services.price}</td>
                  <td>{services.duration}</td>
                  <td>{services.description}</td>
                  <td>
                    <Form.Check
                      checked={selectedServices.includes(
                        services.serviceDetailId
                      )}
                      onChange={() =>
                        handleCheckboxChange(services.serviceDetailId)
                      }
                    />
                  </td>
                </tr>
              ))
            ) : (
              <p>Loading ...</p>
            )}
          </tbody>
        </Table>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => onServicesSelected(selectedServices, lstServices)}
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
