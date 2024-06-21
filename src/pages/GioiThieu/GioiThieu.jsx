import Banner from "../../components/BannerComponent/Banner";
import { Row, Col, Container } from "react-bootstrap";
import "./GioiThieu.css";
import ProductList from "../DanhSachSanPham/ProductList";

const GioiThieu = () => {
  return (
    <div className="containerGt">
      <Banner className="banner" />
      <div>
        <ProductList/>
      </div>
    </div>
  );
};

export default GioiThieu;
