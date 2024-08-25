import { useState } from "react";
import "./Reset.css";
import callApi from "../../utlis/request";
import Annoucement from "../../components/AnnouncementComponent/Announcement";
import PropTypes from "prop-types";

const ResetPassword = ({ verifyCode }) => {
  const [password, setPassword] = useState(""); // Mật khẩu mới
  const [confirmPassword, setConfirmPassword] = useState(""); // Nhập lại mật khẩu mới
  const [data] = useState({
    verifyCode: verifyCode,
    newPass: "",
  });
  const [show, setShow] = useState(false);
  const [content, setContent] = useState("");

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    // Thực hiện xác nhận mật khẩu mới và đặt lại mật khẩu
    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp. Vui lòng thử lại.");
      return;
    } else {
      const newData = {
        ...data,
        newPass: password,
      };
      console.log(newData);
      
      try {
        const response = await callApi(`GuestManager/update-pass?verifyCode=${newData.verifyCode}&newPass=${newData.newPass}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }
        });
        const result = await response.json();
        if (result.isSuccess) {
          setShow(true);
          setContent("Đặt lại mật khẩu thành công");
          console.log("ok");
          
        }else{
          console.log(result);
          
        }
      } catch (error) {
        setShow(true);
        setContent("Đặt lại mật khẩu thất bại");
        console.log("no");
        
      }
    }

    // Đã đặt lại mật khẩu thành công, có thể thêm các xử lý khác ở đây (ví dụ: gửi request API đổi mật khẩu)
    alert("Đặt lại mật khẩu thành công!");
    // Sau khi thành công, có thể chuyển hướng người dùng về trang đăng nhập hoặc trang chính
    // Ví dụ: window.location.href = '/login';
  };

  return (
    <div className="reset-password-container">
      <div className="card-tl3">
        <div className="form-container">
          <h2 className="title">Đặt lại mật khẩu</h2>
          <form onSubmit={handlePasswordReset}>
            <div className="form-group">
              <label className="label">Mật khẩu mới</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="Nhập mật khẩu mới"
                required
              />
            </div>
            <div className="form-group">
              <label className="label">Nhập lại mật khẩu mới</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input"
                placeholder="Nhập lại mật khẩu mới"
                required
              />
            </div>
            <button type="submit" className="button">
              Đặt lại mật khẩu
            </button>
          </form>
        </div>
      </div>
      <Annoucement
        content={content}
        show={show}
        onClose={() => setShow(false)}
      />
    </div>
  );
};

ResetPassword.propTypes = {
  verifyCode: PropTypes.string.isRequired,
};

export default ResetPassword;
