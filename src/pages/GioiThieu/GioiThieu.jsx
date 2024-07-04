import Banner from "../../components/BannerComponent/Banner";
import { useLocation } from "react-router-dom";
import "./GioiThieu.css";
import ProductList from "../DanhSachSanPham/ProductList";
import { useEffect } from "react";

const GioiThieu = () => {
  // const location = useLocation();

  // useEffect(() => {
  //   const param = new URLSearchParams(location.search);
  //   const verifyCode = param.get("verifyCode");
  //   console.log(verifyCode);
  //   const verifyAccount = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://localhost:7039/api/GuestManager/verify-cus?verifyCode=${verifyCode}`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       if (response.ok) {
  //         console.log("ok");
  //       } else {
  //         console.log("co loi");
  //       }
  //     } catch (error) {
  //       console.error("Co loi xay ra: " + error);
  //     }
  //   };

  //   verifyAccount();
  // }, [location]);

  const isBlockTrue = true;
  return (
    <div className="containerGt">
      <Banner className="banner" />
      <div>
        <ProductList isBlock={isBlockTrue} />
      </div>
    </div>
  );
};

export default GioiThieu;
