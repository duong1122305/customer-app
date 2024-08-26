import { useState, useRef } from "react";
import "./OTPVerificationC.css"; // Import CSS file for styling
import Reset from "./Reset"; // Import Reset component for password reset
import PropTypes from "prop-types";
import callApi from "../../utlis/request";
import { Form } from "react-bootstrap";

const OTPVerification = ({ emailSend }) => {
  const [timerCount, setTimerCount] = useState(60); // Countdown timer
  const [disableResend, setDisableResend] = useState(false); // Disable resend OTP button state
  const [otpVerified, setOtpVerified] = useState(false); // State to track OTP verification
  const otpRef = useRef(null);
  const [data] = useState({
    verifyCode: "",
    email: emailSend,
  });
  const [errors, setErrors] = useState({});
  const [res, setRes] = useState("");
  const [isSend, setIsSend] = useState("");

  const [code, setCode] = useState("");
  // Function to resend OTP
  const resendOTP = async (e) => {
    if (disableResend) return;
    e.preventDefault();
    try {
      console.log(emailSend);
      const response = await callApi(
        `GuestManager/forgot-pass?email=${emailSend}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      if (result.isSuccess) {
        simulateSendEmail();
        console.log("ok");
      } else {
        console.log(result.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const simulateSendEmail = () => {
    // calll api ở đây
    setTimeout(() => {
      setDisableResend(true); // Disable resend button
      setTimerCount(60); // reset time gửi lại mã
      startTimer();
      setIsSend("Mã xác minh đã được gửi lại");
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
  const handleOTPChange = (value) => {
    const newError = {};

    const regex = /^[0-9]*$/;
    if (!regex.test(value)) {
      newError.otp = "Mã otp chỉ chứa ký tự số";
    } else if (value.trim().length < 6) {
      newError.otp = "Mã otp phải đủ 6 ký tự";
    } else if (value.trim().length > 6) {
      newError.otp = "Mã otp chỉ chứa 6 ký tự";
    }

    setErrors(newError);

    if (Object.keys(newError).length === 0) {
      return true;
    }
  };

  // Function to verify OTP
  const verifyOTP = async (e) => {
    e.preventDefault();

    if (handleOTPChange(otpRef.current.value)) {
      const newData = {
        ...data,
        verifyCode: otpRef.current.value,
      };
      try {
        const response = await callApi(
          `GuestManager/check-verify-code?confirmCode=${newData.verifyCode}&email=${newData.email}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();
        if (result.isSuccess) {
          setOtpVerified(true);
          const trimmedCode = result.data.trimStart().trimEnd();
          const replaceCode = trimmedCode.replace(/\s/g, "+");
          const finalCode = encodeURIComponent(replaceCode);
          setCode(finalCode);
          setRes("");
        } else {
          setRes(result.error);
          console.error(result.error);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="otp-verification-container">
      {!otpVerified ? ( // If OTP is not verified, show OTP verification form
        <div className="card-tl">
          <div className="form-container">
            <h2 className="title">Xác nhận OTP</h2>
            <div className="otp-input-container">
              <Form.Control
                ref={otpRef}
                onChange={() => handleOTPChange(otpRef.current.value)}
              />
            </div>
            {errors.otp && (
              <span className="text-danger mb-2">{errors.otp}</span>
            )}
            {res !== "" ? (
              <span className="text-danger mb-2">{res}</span>
            ) : (
              <span style={{ display: "none" }}></span>
            )}
            <p>
              <b>Email:</b> {emailSend}
            </p>
            <button onClick={verifyOTP} className="button">
              Xác nhận OTP
            </button>
            <div className="resend-container" style={{ marginTop: 10 }}>
              <p style={{ marginTop: 20, marginRight: 10 }}>
                Chưa nhận được mã?
              </p>
              <button
                onClick={resendOTP}
                className={`resend-button ${disableResend ? "disabled" : ""}`}
                disabled={disableResend}
              >
                {disableResend
                  ? `Gửi lại OTP trong ${timerCount}s`
                  : "Gửi lại OTP"}
              </button>
            </div>
            {isSend !== "" ? (
              <span className="text-danger">{isSend}</span>
            ) : (
              <span style={{ display: "none" }}></span>
            )}
          </div>
        </div>
      ) : (
        <Reset verifyCode={code} />
      )}
    </div>
  );
};

OTPVerification.propTypes = {
  emailSend: PropTypes.string,
};

export default OTPVerification;
