import { useEffect, useState } from "react";
import OTPVerification from "./OTPVerification"; // Import component OTPVerification
import "./QuenMatKhau.css"; // Import CSS file for styling
import callApi from "../../utlis/request";
import { Button, Form } from "react-bootstrap";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1); // Step 1: Nhập email, Step 2: Xác nhận OTP
  const [otpSent, setOtpSent] = useState(false); // Trạng thái đã gửi OTP
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let timeoutId;

    if (otpSent) {
      timeoutId = setTimeout(() => {
        setStep(2); 
      }, 4000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [otpSent]);

  const handleSendEmail = async (e) => {
    e.preventDefault();
    const newError = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim().length < 0 || email.trim().length === 0) {
      newError.email = "Email không được để trống";
    } else if (!emailRegex.test(email)) {
      newError.email = "Email không hợp lệ";
    }

    setErrors(newError);

    if (Object.keys(newError).length === 0) {
      try {
        console.log(email);
        const response = await callApi(
          `GuestManager/forgot-pass?email=${email}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();
        if (result.isSuccess) {
          setOtpSent(true)
          console.log("ok");
        } else {
          console.log(result.error);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="card-tl2">
        <div className="form-container">
          <h2
            className="title"
            style={step === 2 ? { display: "none" } : { display: "block" }}
          >
            Quên mật khẩu
          </h2>
          {step === 1 && (
            <Form onSubmit={handleSendEmail}>
              <Form.Control
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="Nhập email của bạn"
              />
              {errors.email && <span className="text-danger">{errors.email}</span>}
              {otpSent && <span>Mã đã được gửi về email của bạn.</span>}
              <Button type="submit" className="button">
                Gửi mã xác nhận
              </Button>
            </Form>
          )}

          {step === 2 && otpSent && (
            <OTPVerification emailSend={email} onBack={() => setStep(1)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
