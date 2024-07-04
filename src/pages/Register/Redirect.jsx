import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Redirect = () => {
//   const [count, setCount] = useState(5);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const param = new URLSearchParams(location.search);
    const verifyCode = param.get("verifyCode");
    console.log(verifyCode);
    const verify = async () => {
      try {
        const response = await fetch(
          `https://localhost:7039/api/GuestManager/verify-cus?verifyCode=${verifyCode}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(verifyCode),
          }
        );

        const result = await response.json();
        console.log(result);

        if (result.isSuccess) {
          // Kiểm tra trực tiếp isSuccess (không cần so sánh === true)
          setMessage("Xác minh thành công !!!");

          navigate("/");
        } else {
          setMessage("Xác minh không thành công !!!");
          console.error(result.error); // Hiển thị thông báo lỗi chi tiết hơn từ API
        }
      } catch (error) {
        console.error("Có lỗi xảy ra:", error); // Hiển thị chi tiết lỗi cụ thể
        setMessage("Đã có lỗi xảy ra trong quá trình xác minh."); // Thông báo lỗi cho người dùng
      }
    };

    verify(); // Gọi hàm verify bên trong useEffect
  }, [location, navigate]); // Thêm verifyCode vào dependency array

  return (
    <div style={{ height: "100vh" }}>
      {/* <h2>{message}</h2>
      {count > 0 && ( // Chỉ hiển thị đếm ngược khi count > 0
        <p>Bạn sẽ được chuyển hướng về trang chủ sau {count} giây hoặc bạn có thể <a href="/">bấm vào đây</a>.</p>
      )} */}
    </div>
  );
};

export default Redirect;
