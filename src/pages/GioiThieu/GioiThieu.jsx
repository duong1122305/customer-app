import Banner from "../../components/BannerComponent/Banner";
import "./GioiThieu.css";
import ProductList from "../DanhSachSanPham/ProductList";

const GioiThieu = () => {
  const isBlockTrue = "hidden";
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
