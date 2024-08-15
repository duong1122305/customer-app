import { Button, FloatingLabel, Form } from "react-bootstrap";
import StarRating from "../../components/StarRatingComponent/StarRating";
import "./ReportByGuest.css";

const ReportByGuest = () => {
  return (
    <div className="total">
      <div className="total_form">
        <Form>
          <FloatingLabel className="star">
            <StarRating />
          </FloatingLabel>
          <label className="comment">
            <p>Ý kiến của bạn</p>
            <Form.Control
              as="textarea"
              className="input_area"
              cols={10}
              rows={10}
            />
          </label>
          <Button className="btn_gui">Gửi</Button>
        </Form>
      </div>
    </div>
  );
};

export default ReportByGuest;
