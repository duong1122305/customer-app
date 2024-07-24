import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import callApi from "../../utlis/request";

const Redirect = () => {
  //   const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const param = new URLSearchParams(location.search);
    const verifyCode = param.get("verifyCode");
    const trimmedCode = verifyCode.trimStart().trimEnd();
    const replaceCode = trimmedCode.replace(/\s/g, "+");
    const finalCode = encodeURIComponent(replaceCode);

    const verify = async () => {
      if (!isLoading) return;
      setIsLoading(true);
      try {
        const response = await callApi(
          `GuestManager/verify-cus?verifyCode=${finalCode}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();
        console.log(result);

        if (isMounted) {
          if (result.isSuccess) {
            // Kiểm tra trực tiếp isSuccess (không cần so sánh === true)
            navigate("/success", { replace: true });
          } else {
            if (result.error === "Thông tin xác minh của bạn đã quá hạn") {
              navigate("/expired", { replace: true });
            } else if (
              result.error === "Tài khoản đã được xác minh hoặc mã xác minh sai"
            ) {
              navigate("/duplicate", { replace: true });
            }
            console.error(result.error); // Hiển thị thông báo lỗi chi tiết hơn từ API
          }
        }
      } catch (error) {
        console.error("Có lỗi xảy ra:", error); // Hiển thị chi tiết lỗi cụ thể
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    verify(); // Gọi hàm verify bên trong useEffect

    return () => {
      isMounted = false;
    };
  }, [location.search]); // Thêm verifyCode vào dependency array

  return <div></div>;
};

export default Redirect;
