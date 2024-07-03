import { Link } from "react-router-dom";
import products from "../SanPham/Product";
import VerticalMenu from "../../components/MenuVerticalComponent/VerticalMenu";
import PropTypes from "prop-types";

const ProductList = ({ isBlock }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-3 col-md-3 mt-5"
          style={{ width: 300, display: isBlock ? "none" : "block" }}
        >
          <h2>Danh mục sản phẩm</h2>
          <VerticalMenu />
        </div>
        <div className="col-12 col-md-9">
          <h1 className="mt-5 mb-4 text-center">SẢN PHẨM</h1>
          <div className="row">
            {products.map((product) => (
              <div key={product.id} className="col-12 col-md-3 mb-4">
                <div className="card">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text font-weight-bold">
                      {product.price}
                    </p>
                    <Link
                      to={`/product/${product.id}`}
                      className="btn btn-primary"
                    >
                      Chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

ProductList.propTypes = {
  isBlock: PropTypes.bool,
};

export default ProductList;
