import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Redirect = () => {
  //   const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const param = new URLSearchParams(location.search);
    const verifyCode = param.get("verifyCode");
    const trimmedCode = verifyCode.trimStart().trimEnd();
    const replaceCode = trimmedCode.replace(/\s/g, "+");
    const finalCode = encodeURIComponent(replaceCode);
    console.log(finalCode);
    const verify = async () => {
      try {
        const response = await fetch(
          `https://localhost:7039/api/GuestManager/verify-cus?verifyCode=${finalCode}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            //body: JSON.stringify(verifyCode),
          }
        );

        const result = await response.json();
        console.log(result);

        if (result.isSuccess) {
          // Kiểm tra trực tiếp isSuccess (không cần so sánh === true)
          navigate("/");
        } else {
          if (result.error === "Thông tin xác minh của bạn đã quá hạn") {
            navigate("/expried");
          } else if (
            result.error === "Tài khoản đã được xác minh hoặc mã xác minh sai"
          ) {
            navigate("/duplicate");
          }
          console.error(result.error); // Hiển thị thông báo lỗi chi tiết hơn từ API
        }
      } catch (error) {
        console.error("Có lỗi xảy ra:", error); // Hiển thị chi tiết lỗi cụ thể
      }
    };

    verify(); // Gọi hàm verify bên trong useEffect
  }, [navigate, location]); // Thêm verifyCode vào dependency array

  return <div></div>;
};

export default Redirect;
