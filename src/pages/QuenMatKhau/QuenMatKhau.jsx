import { useState } from 'react';
import OTPVerification from './OTPVerification'; // Import component OTPVerification
import './QuenMatKhau.css'; // Import CSS file for styling
import callApi from "../../utlis/request";
import { Button, Form } from 'react-bootstrap';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1); // Step 1: Nhập email, Step 2: Xác nhận OTP
  const [otpSent, setOtpSent] = useState(false); // Trạng thái đã gửi OTP

  const simulateSendEmail = () => {
    // Simulate sending email successfully
    setTimeout(() => {
      setOtpSent(true);
      setStep(2); // Chuyển sang bước nhập OTP
    }, 3000); // Simulate delay to see the sending process
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    try {
      console.log(email);
      const response = await callApi(`GuestManager/forgot-pass?email=${email}`, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
      });
      const result = await response.json()
      if(result.isSuccess){
        simulateSendEmail();
        console.log("ok");
      }else{
        console.log(result.error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="forgot-password-container">
      <div className="card-tl2">
        <div className="form-container">
          <h2 className="title" style={step === 2 ? {display:"none"} : {display:"block"}}>Quên mật khẩu</h2>
          {step === 1 && (
            <Form onSubmit={handleSendEmail}>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="Nhập email của bạn"
                required
              />
              {/* {otpSent && <span>Mã đã được gửi về email của bạn.</span>} */}
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
