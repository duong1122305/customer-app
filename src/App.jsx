import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Redirect from "./pages/Register/Redirect";
import GioiThieu from "./pages/GioiThieu/GioiThieu";
import DichVu from "./pages/DichVu/DichVu";
import DatLich from "./pages/DatLich/DatLich";
import LienHe from "./pages/LienHe/LienHe";
import DanhSachSanPham from "./pages/DanhSachSanPham/ProductList";
import SanPhamChiTiet from "./pages/SanPhamChiTiet/ProductDetail";
import QuenMatKhau from "./pages/QuenMatKhau/QuenMatKhau";
import MainLayout from "./MainLayout";
import BlankLayout from "./BlankLayout";
import Profile from "./pages/Profile/Profile";
import Expired from "./pages/Register/Expired";
import Duplicate from "./pages/Register/Duplicate";
import Success from "./pages/Register/Success";
import ReportByGuest from "./pages/ReportByGuest/ReportByGuest";
import NotThingLayout from "./NotThingLayout";

function App() {
  useEffect(() => {
    let timeoutId;
    const resetTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        sessionStorage.removeItem("token");
      }, 60 * 60 * 1000);
    };

    resetTimeout();

    window.addEventListener("click", resetTimeout);
    window.addEventListener("keypress", resetTimeout);

    return () => {
      clearTimeout(timeoutId);
      window.addEventListener("keypress", resetTimeout);
      window.removeEventListener("click", resetTimeout);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<GioiThieu />} />
            <Route path="/services" element={<DichVu />} />
            <Route path="/booking" element={<DatLich />} />
            <Route path="/contact" element={<LienHe />} />
            <Route path="/listProduct" element={<DanhSachSanPham />} />
            <Route path="/product/:id" element={<SanPhamChiTiet />} />
            <Route path="/forgot-password" element={<QuenMatKhau />} />
            <Route path="/redirect" element={<Redirect />} />
          </Route>
          <Route path="/" element={<BlankLayout />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/expired" element={<Expired />} />
            <Route path="/duplicate" element={<Duplicate />} />
            <Route path="/success" element={<Success />} />
          </Route>
          <Route path="/" element={<NotThingLayout />}>
            <Route path="/report" element={<ReportByGuest />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
