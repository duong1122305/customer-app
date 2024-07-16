import { Button, ButtonGroup, FloatingLabel, Form } from "react-bootstrap";
import TableServices from "../TableServices/TableServices";
import { useState } from "react";
import "./NotLogin.css";

const NotLogin = () => {
  const [show, setShow] = useState(false);
  const handleShowPopup = () => {
    setShow(true);
  };
  const handleClosePopup = () => {
    setShow(false);
  };
  return (
    <div>
      <Form>
        <Button onClick={handleShowPopup}>Danh sách dịch vụ</Button>
        <TableServices show={show} onClosed={handleClosePopup} />
        <FloatingLabel label="Email">
          <Form.Control type="email" />
        </FloatingLabel>
        <FloatingLabel label="Họ và tên">
          <Form.Control type="text" />
        </FloatingLabel>
        <FloatingLabel label="SĐT">
          <Form.Control type="text" />
        </FloatingLabel>
        <FloatingLabel label="Địa chỉ">
          <Form.Control as="textarea" cols="4" />
        </FloatingLabel>
        <FloatingLabel label="Boss của bạn thuộc">
          <Form.Select>
            <option></option>
          </Form.Select>
        </FloatingLabel>
        <FloatingLabel label="Tên của boss">
          <Form.Control type="text" />
        </FloatingLabel>
        <FloatingLabel label="Ngày làm dịch vụ">
          <Form.Control type="date" />
        </FloatingLabel>
        <FloatingLabel label="Thời gian làm dịch vụ">
          <Form.Control type="time" />
        </FloatingLabel>
        <ButtonGroup>
          <Button type="submit">Gửi yêu cầu</Button>
          <Button variant="warning" type="reset">
            Chọn lại
          </Button>
        </ButtonGroup>
      </Form>
    </div>
  );
};

export default NotLogin;
