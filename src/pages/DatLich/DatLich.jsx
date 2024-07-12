import { Dropdown } from "bootstrap";
import "./DatLich.css";
import { Form } from "react-bootstrap";

const DatLich = () => {
  return (
    <div>
      <Form>
        <label htmlFor="">YÊU CẦU DỊCH VỤ <p className="text-danger">*</p></label>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Chọn dịch vụ bạn muốn
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Form.Group>
          <Form.Label>Họ và tên <p className="text-danger">*</p></Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Số điện thoại <p className="text-danger">*</p></Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Địa chỉ <p className="text-danger">*</p></Form.Label>
          <Form.Control as="textarea" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email <p className="text-danger">*</p></Form.Label>
          <Form.Control type="email" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Thời gian <p className="text-danger">*</p></Form.Label>
          <Form.Control type="datetime" />
        </Form.Group>
      </Form>
    </div>
  );
};

export default DatLich;
