import React, { useState } from 'react';
import OTPVerification from './OTPVerification'; // Import component OTPVerification
import './QuenMatKhau.css'; // Import CSS file for styling

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1); // Step 1: Nhập email, Step 2: Xác nhận OTP
  const [otpSent, setOtpSent] = useState(false); // Trạng thái đã gửi OTP

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Simulate sending email to receive OTP
    simulateSendEmail();
  };

  const simulateSendEmail = () => {
    // Simulate sending email successfully
    setTimeout(() => {
      setOtpSent(true);
      setStep(2); // Chuyển sang bước nhập OTP
      alert("Vui lòng kiểm tra email");
    }, 1500); // Simulate delay to see the sending process
  };

  return (
    <div className="forgot-password-container">
      <div className="card-tl2">
        <div className="form-container">
          <h2 className="title">Quên mật khẩu</h2>
          {step === 1 && (
            <form onSubmit={handleEmailSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="Nhập địa chỉ email của bạn"
                required
              />
              <button type="submit" className="button">
                Gửi mã xác nhận
              </button>
            </form>
          )}

          {step === 2 && otpSent && (
            <OTPVerification email={email} onBack={() => setStep(1)} />
          )}
          
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
