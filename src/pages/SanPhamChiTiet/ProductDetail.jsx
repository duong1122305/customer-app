// src/pages/SanPhamChiTiet/ProductDetail.js

import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../SanPham/Product';
import VerticalMenu from "../../components/MenuVerticalComponent/VerticalMenu"; 


const ProductDetail = () => {
  let { id } = useParams(); // Lấy id từ URL

  // Kiểm tra xem products có phải là một mảng và không rỗng
  if (!Array.isArray(products) || products.length === 0) {
    return <div>Danh sách sản phẩm trống.</div>;
  }

  // Tìm sản phẩm trong danh sách dựa vào id
  const product = products.find(product => product.id === parseInt(id));

  if (!product) {
    return <div>Sản phẩm không tồn tại.</div>;
  }

  return (
    <div className="container-fluid mt-5">
      <div className="row">
      <div className="col-3 col-md-3 mt-3">
        <h2>Danh mục sản phẩm</h2>
          <VerticalMenu />
      </div>
        <div className="d-flex col-md-7 mt-5">
          <div className='me-5'>
          <img src={product.image} className="img-fluid" alt={product.name} width={400}/>
          </div>
          <div className='col-md-6'>
          <h2>{product.name}</h2>
          <p>Mã sản phẩm:{product.maProduct}</p>
          <p>Tình trạng: {product.trangThai}</p>
          <p>Thương hiệu: {product.brand}</p>
          <p className="font-weight-bold">Giá bán: {product.price}</p>
          <p>{product.description}</p>
          </div>
          </div>
      </div>
    </div>
  );
};

export default ProductDetail;
