import { Form, Button } from "react-bootstrap";
import "./DatLich.css";

const DatLich = () => {
  return (
    <div className="booking">
      <div className="child-booking">
        <h6>ĐẶT LỊCH NGAY CHO BOSS NHÉ {"<3"}</h6>
        <Form>
          <Form.Group>
            <Form.Label>Họ và tên</Form.Label>
            <Form.Control></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>SĐT</Form.Label>
            <Form.Control></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Lời nhắn để lại cho chúng tôi</Form.Label>
            <Form.Control as="textarea" rows={5} cols={5}></Form.Control>
          </Form.Group>
          <Button type="submit">ĐẶT LỊCH</Button>
        </Form>
      </div>
    </div>
  );
};

export default DatLich;
