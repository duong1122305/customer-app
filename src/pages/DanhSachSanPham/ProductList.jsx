import { Link } from "react-router-dom";
import VerticalMenu from "../../components/MenuVerticalComponent/VerticalMenu";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import callApi from "../../utlis/request";
import "./ProductList.css";
import { Pagination, Spinner } from "react-bootstrap";

const ProductList = ({ isBlock }) => {
  const [lstProduct, setLstProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await callApi("Product/List-Product", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        if (result.isSuccess) {
          setLstProduct(result.data);
        } else {
          console.error("Error fetching products:", result.error);
        }
      } catch (error) {
        console.error("Network error:", error);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [selectedId]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = lstProduct.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleGetId = (cateId) => {
    setSelectedId(cateId);
    console.log(cateId);
  };

  const filteredProducts = selectedId
    ? currentProducts.filter(
        (product) =>
          product.categoryId === selectedId || // Filter by category ID
          product.categoryProductId === selectedId // Or filter by another relevant field if needed
      )
    : currentProducts;

      const removeSelectedId = () => {
        setSelectedId(null);
      }

  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-3 col-md-3 mt-5"
          style={{ width: 300, visibility: isBlock }}
        >
          <h2 onClick={removeSelectedId}>Danh mục sản phẩm</h2>
          <VerticalMenu selectedCateDetailId={handleGetId} />
        </div>
        <div className="col-12 col-md-9 l">
          <h1 className="mt-5 mb-4 text-center" onClick={removeSelectedId}>SẢN PHẨM</h1>
          {loading ? (
            <Spinner />
          ) : (
            <div className="row">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div key={product.id} className="col-12 col-md-3 mb-5">
                    <div className="card">
                      <img
                        src={product.url}
                        className="card-img-top"
                        alt={product.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className={`card-text`}>{product.description}</p>
                        <p
                          className="card-text font-weight-bold mt-2"
                          style={{ fontSize: "20px", fontStyle: "oblique" }}
                        >
                          {product.price} đ
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
                ))
              ) : (
                <span style={{textAlign:"center", marginBottom:"10px"}}>Không có sản phẩm</span>
              )}
            </div>
          )}
          <Pagination style={filteredProducts.length > 0 ? {display:"flex"} : {display:"none"}}>
            <Pagination.First onClick={() => paginate(1)} />
            <Pagination.Prev
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {/* Hiển thị các trang */}
            {Array.from({
              length: Math.ceil(lstProduct.length / productsPerPage),
            }).map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(lstProduct.length / productsPerPage)
              }
            />
            <Pagination.Last
              onClick={() =>
                paginate(Math.ceil(lstProduct.length / productsPerPage))
              }
            />
          </Pagination>
        </div>
      </div>
    </div>
  );
};

ProductList.propTypes = {
  isBlock: PropTypes.string,
};

export default ProductList;
