import { Button, Col, Container, Figure, Row } from "react-bootstrap";
import "./ProductDetail.css";
import { useEffect, useState } from "react";
import callApi from "../../utlis/request";
import { useLocation, useParams } from "react-router-dom";

const ProductDetail = () => {
  const [data, setData] = useState({
    id: "",
    nameProduct: "",
    brandName: "",
    brandDescription: "",
    cateDetailName: "",
    productDescription: "",
    imgUrl: "",
    listProductDetail: [],
  });

  //get url param
  const location = useLocation();
  const param = location.pathname.split("/");
  var id = useParams();
  id = param[param.length - 1];

  useEffect(() => {
    try {
      const getProduct = async () => {
        const res = await callApi(`Product/get-product-by-id?id=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "appication/json",
          },
        });
        const result = await res.json();
        if (result.isSuccess) {
          setData(result.data);
        } else {
          console.error();
        }
      };
      getProduct();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Container className="total_container_product">
      <div className="total">
        <Row className="image">
          <Col className="image_con">
            <Figure>
              <Figure.Image src={data.imgUrl} />
            </Figure>
          </Col>
        </Row>
        <Row className="content">
          <Col>
            <h3>
              <b>{data.nameProduct}</b>
            </h3>
            <h6>
              Thương hiệu:{" "}
              <b style={{ fontStyle: "italic" }}>{data.brandName}</b>
            </h6>
          </Col>
          <Col>
          <h6>Giá: {data.listProductDetail[0].price}đ</h6>
            {data.listProductDetail.length > 0 &&
              data.listProductDetail.map((item) => (
                <div key={Math.random()} style={{display:"flex", flexWrap:"wrap", width:"100px"}}>
                  <Button>Loại: {item.name}</Button>
                </div>
              ))}
            <p className="mt-3">
              Mô tả: <b>{data.productDescription}</b>
            </p>
          </Col>
          <Col className="mt-2">
            Danh mục: <p>{data.cateDetailName}</p>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default ProductDetail;
