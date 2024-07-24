import { Link } from "react-router-dom";
import VerticalMenu from "../../components/MenuVerticalComponent/VerticalMenu";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import callApi from "../../utlis/request";
import "./ProductList.css";

const ProductList = ({ isBlock }) => {
  const [lstProduct, setLstProduct] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      const response = await callApi("Product/List-Product", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if(result.isSuccess){
        setLstProduct(result.data);
      }else{
        console.log(result.error);
      }
    };
    getProduct();
  });

  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-3 col-md-3 mt-5"
          style={{ width: 300, visibility: isBlock }}
        >
          <h2>Danh mục sản phẩm</h2>
          <VerticalMenu />
        </div>
        <div className="col-12 col-md-9">
          <h1 className="mt-5 mb-4 text-center">SẢN PHẨM</h1>
          <div className="row">
            {lstProduct.map((product) => (
              <div key={product.id} className="col-12 col-md-3 mb-5">
                <div className="card">
                  <img
                    src={product.url}
                    className="card-img-top"
                    alt={product.name}
                  />
                  <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className={`card-text`}>
                  {product.description}
                </p>
                <p className="card-text font-weight-bold mt-2" style={{fontSize:"20px"}}>{product.price}</p>
                <Link to={`/product/${product.id}`} className="btn btn-primary">
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
  isBlock: PropTypes.string,
};

export default ProductList;
