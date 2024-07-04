import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/FooterComponent/Footer";
import Header from "./components/HeaderComponent/Header";
import Redirect from "./pages/Register/Redirect";
import GioiThieu from "./pages/GioiThieu/GioiThieu";
import DichVu from "./pages/DichVu/DichVu";
import DatLich from "./pages/DatLich/DatLich";
import LienHe from "./pages/LienHe/LienHe";
import DanhSachSanPham from "./pages/DanhSachSanPham/ProductList";
import SanPhamChiTiet from "./pages/SanPhamChiTiet/ProductDetail";
import QuenMatKhau from "./pages/QuenMatKhau/QuenMatKhau";

function App() {
  useEffect(() => {
    let timeoutId;
    const resetTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        sessionStorage.removeItem("token");
      }, 1 * 60 * 1000);
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
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<GioiThieu />} />
          <Route path="/services" element={<DichVu />} />
          <Route path="/booking" element={<DatLich />} />
          <Route path="/contact" element={<LienHe />} />
          <Route path="/listProduct" element={<DanhSachSanPham />} />
          <Route path="/product/:id" element={<SanPhamChiTiet />} />
          <Route path="/forgot-password" element={<QuenMatKhau />} />
          <Route path="/redirect" element={<Redirect />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
