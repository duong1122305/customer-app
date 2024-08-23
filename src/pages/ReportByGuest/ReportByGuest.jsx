import { Button, FloatingLabel, Form } from "react-bootstrap";
import StarRating from "../../components/StarRatingComponent/StarRating";
import "./ReportByGuest.css";
import { useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import callApi from "../../utlis/request";

const ReportByGuest = () => {
  const [star, setStar] = useState(0);
  const commentRef = useRef(null);
  const [isDisable, setIsDisable] = useState(false);

  //get param in url
  const location = useLocation();
  const param = location.pathname.split("/");
  var id = useParams();
  id = param[param.length - 1];

  const [rating] = useState({
    idBooking: Number.parseInt(id),
    comment: "",
    rate: 0,
  });

  const handleGetStar = (selectedRating) => {
    setStar(selectedRating); // Update the state in the parent
    console.log("Selected rating:", selectedRating);
  };

  const handleRating = async () => {
    const data = {
      ...rating,
      comment: commentRef.current.value,
      rate: star,
    };
    console.log(data);
    try {
      const response = await callApi("Report/create-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.isSuccess) {
        setIsDisable(true);
      } else {
        console.log(result.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="total">
      <div className="total_form" style={isDisable ? {display:"none"} : {display: "block"}}>
        <Form>
          <FloatingLabel className="star">
            <StarRating getStar={handleGetStar} />
          </FloatingLabel>
          <label className="comment">
            <p>Ý kiến của bạn</p>
            <Form.Control
              as="textarea"
              className="input_area"
              ref={commentRef}
            />
          </label>
          <Button className="btn_gui" onClick={handleRating}>
            Gửi
          </Button>
        </Form>
      </div>
      <div>
        <div style={isDisable ? {display: "block"} : {display:"none"}} className="text-center">
          <h1>Cảm ơn bạn đã đánh giá 🩷</h1>
          <Button onClick={() => {window.location.href = "/"}} className="mt-2">Quay về trang chủ</Button>
        </div>
      </div>
    </div>
  );
};

export default ReportByGuest;
