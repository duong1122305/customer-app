import React, { useState, useEffect, useRef } from 'react';
import './OTPVerificationC.css'; // Import CSS file for styling
import Reset from './Reset'; // Import Reset component for password reset

const OTPVerification = ({ email }) => {
  const [timerCount, setTimerCount] = useState(60); // Countdown timer
  const [otpInput, setOtpInput] = useState(['', '', '', '', '', '']); // OTP input array
  const [disableResend, setDisableResend] = useState(false); // Disable resend OTP button state
  const [otpVerified, setOtpVerified] = useState(false); // State to track OTP verification

  const inputRefs = useRef([]); // Ref to hold references to all OTP input elements

  // Function to set focus on the next OTP input field
  const focusNextInput = (index) => {
    if (index < otpInput.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Function to set focus on the previous OTP input field
  const focusPreviousInput = (index) => {
    if (index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Function to resend OTP
  const resendOTP = () => {
    if (disableResend) return;

    // Simulate sending email to receive OTP
    simulateSendEmail();
  };

  const simulateSendEmail = () => {
    // calll api ở đây
    setTimeout(() => {
      setDisableResend(true); // Disable resend button
      setTimerCount(60); // reset time gửi lại mã
      startTimer(); 
      alert('Mã xác thực đã được gửi về email của bạn');
    }, 1500);
  };

  // Function to start countdown timer
  const startTimer = () => {
    const id = setInterval(() => {
      setTimerCount((prevCount) => {
        if (prevCount === 1) {
          setDisableResend(false); // Enable resend button when countdown reaches 0
          clearInterval(id); // Clear interval
        }
        return prevCount - 1;
      });
    }, 1000); // Update timer every second
  };

  // Function to handle OTP input changes
  const handleOTPChange = (index, value) => {
    // Ensure only digits are entered
    const regex = /^[0-9]*$/;
    if (!regex.test(value)) {
      return; 
    }

    const updatedOtpInput = [...otpInput];
    updatedOtpInput[index] = value;
    setOtpInput(updatedOtpInput);

    if (value !== '') {
      focusNextInput(index); // Move focus to the next input if value is entered
    } else {
      focusPreviousInput(index); // Move focus to the previous input if value is deleted
    }
  };

  // Function to verify OTP
  const verifyOTP = (e) => {
    e.preventDefault();
    const enteredOTP = otpInput.join('');

    if (enteredOTP === '123456') {
      setOtpVerified(true); // Set OTP verification state to true
    } else {
      alert('Mã OTP không chính xác. Vui lòng thử lại!');
    }
  };

  useEffect(() => {
    // Focus on the first input field when component mounts
    inputRefs.current[0].focus();
  }, []);

  return (
    <div className="otp-verification-container">
      {!otpVerified ? ( // If OTP is not verified, show OTP verification form
        <div className="card-tl">
          <div className="form-container">
            <h2 className="title">Xác nhận OTP</h2>
            <div className="otp-input-container">
              {Array.from({ length: 6 }, (_, index) => (
                <input
                  key={index}
                  maxLength="1"
                  className="otp-input"
                  type="text"
                  value={otpInput[index]}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  ref={(el) => (inputRefs.current[index] = el)} // Store reference to each input element
                />
              ))}
            </div>
            <button onClick={verifyOTP} className="button">
              Xác nhận OTP
            </button>
            <div className="resend-container" style={{ marginTop: 10 }}>
              <p style={{ marginTop: 20, marginRight: 10 }}>Chưa nhận được mã?</p>
              <button
                onClick={resendOTP}
                className={`resend-button ${disableResend ? 'disabled' : ''}`}
                disabled={disableResend}
              >
                {disableResend ? `Gửi lại OTP trong ${timerCount}s` : 'Gửi lại OTP'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Reset />
      )}
    </div>
  );
};

export default OTPVerification;
