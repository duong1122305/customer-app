import { useContext, useEffect} from "react";
import "./DatLich.css";
import { Col, Container, Image, Row } from "react-bootstrap";
import IsLogin from "./IsLogin/IsLogin";
import NotLogin from "./NotLogin/NotLogin";
import { SessionContext } from "../../contex/SessionContex";

const DatLich = () => {
  // const [isLogin, setIsLogin] = useState(false);
  const sessionContext = useContext(SessionContext);
  // const token = sessionStorage.getItem("token");
  // useEffect(() => {
  //   if (token !== null) {
  //     setIsLogin(true);
  //   } else {
  //     setIsLogin(false);
  //   }
  // }, [token]);
  // useEffect(() => {
  //   if(!sessionContext.isLogin){
  //     window.location.href = "/"
  //   }
  // }, [sessionContext.isLogin])
  console.log(sessionContext);
  
  return (
    <>
      <div className="bookHead">
        <Image className="image" src="/assets/image/ok.png" />
      </div>
      <Container className="booking">
        <Col className="col-full">{sessionStorage.getItem("token") !== null && sessionContext.isLogin !== false ? <IsLogin /> : <NotLogin />}</Col>
        <Col className="col-last">
          <Row>
            <h5>
              HỖ TRỢ <span style={{ color: "#49B3F4" }}>24/7</span>
            </h5>
            <Image
              className="imagecol"
              style={{ width: "150px" }}
              src="https://petservicehcm.com/wp-content/uploads/2020/01/Ho%CC%82%CC%83-tro%CC%9B%CC%A3-247.png.webp"
            />
          </Row>
          <Row className="rownews">
            <h5 style={{ color: "#49B3F4" }}>BÀI VIẾT MỚI</h5>
            <hr style={{ width: "60%" }} />
            <div className="news">
              <div>
                <p>Giới trẻ Trung Quốc trọng thú cưng hơn bạn đời</p>
                <a href="https://vnexpress.net/gioi-tre-trung-quoc-trong-thu-cung-hon-ban-doi-4768275.html">
                  Xem thêm...
                </a>
              </div>
              <div>
                <p>7749 kiếp nạn của chó cưng</p>
                <a href="https://vnexpress.net/7749-kiep-nan-cua-cho-cung-4768359.html">
                  Xem thêm...
                </a>
              </div>
              <div>
                <p>Chi gần 40.000 USD cho chó đi du lịch</p>
                <a href="https://vnexpress.net/chi-gan-40-000-usd-cho-cho-di-du-lich-4768308.html">
                  Xem thêm...
                </a>
              </div>
            </div>
          </Row>
        </Col>
      </Container>
      <div className="bookFooter">
        <h2>
          Hotline hỗ trợ 24/7 của chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc
          của bạn | 0898520760
        </h2>
      </div>
    </>
  );
};

export default DatLich;
