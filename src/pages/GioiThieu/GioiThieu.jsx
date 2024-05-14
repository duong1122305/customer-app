import Banner from "../../components/BannerComponent/Banner";
import { Row, Col, Container } from "react-bootstrap";
import "./GioiThieu.css";

const GioiThieu = () => {
  return (
    <div className="containerGt">
      <Banner className="banner" />
      <div style={{ backgroundColor: "#ffffff" }} className="gtBody">
        <Row className="row-1">
          <Col>
            <h3>
              DỊCH VỤ SPA TRỌN GÓI - CHĂM SÓC THÚ CƯNG 5
              <i
                className="fa-solid fa-star"
                style={{ color: "gold", marginLeft: "10px", fontSize: "30px" }}
              ></i>
            </h3>
          </Col>
          <Col>
            <h5 style={{ letterSpacing: "2px" }}>
              <i
                className="fa-solid fa-phone"
                style={{ color: "pink", marginRight: "10px" }}
              ></i>
              024.7106.9876 - 028.7106.9964
            </h5>
          </Col>
        </Row>
        <Container className="mt-3">
          <Row className="row-content">
            <Col className="content">
              <h2>🐶😸 địa chỉ làm đẹp thú cưng top 1</h2>
              <hr className="hr" />
              <p>
                <b>Dịch vụ tắm spa cho chó mèo</b> Pet Mew với nhiều chi nhánh
                cửa hàng tại <b>Hà Nội, TP.HCM, Đà Nẵng và Hải Phòng </b>
                tại đây cung cấp phương pháp chăm sóc thú cưng toàn diện từ A
                đến Z.
              </p>
              <p>
                <b>Trọn gói bao gồm:</b> tắm, vắt tuyến hôi, sấy khô, chải lông
                rối, nhổ lông tai, vệ sinh tai, cắt mài móng chân, cạo lông theo
                yêu cầu. Tất cả đều với với mong muốn mang tới cho thú cưng của
                bạn một cuộc sống khỏe mạnh và hạnh phúc nhất.
              </p>
              <p>
                Với đội ngũ nhân viên giàu kinh nghiệm, kiến thức chuyên sâu sẽ
                tư vấn và cung cấp cho bạn những gói dịch vụ tắm spa cho chó mèo
                chất lượng nhất mà bạn không thể tự làm được tại nhà. Những chú
                cún và mèo cưng sẽ nhanh chóng được tút lại nhan sắc trở lên
                xinh đẹp và đáng yêu hơn.
              </p>
            </Col>
            <Col className="figure">
              <img src="/src/assets/image/petshop4.png" alt="#" />
            </Col>
          </Row>
          <Row className="camket">
            <Col>
              <h3>👍 3 ĐIỀU LUÔN CAM KẾT VỚI KHÁCH HÀNG</h3>
            </Col>
            <hr className="hr" />
            <Row className="row-camket">
              <Col className="col-camket">
                <h4>❣️ HẾT MÌNH VÌ CÔNG VIỆC</h4>
                <p>
                  Chúng tôi làm việc hết mình với chữ tâm, trách nhiệm và sự yêu
                  nghề. Thú cưng khỏe mạnh là niềm hạnh phúc của chúng tôi.
                </p>
              </Col>
              <Col className="col-camket">
                <h4>✅ GIÁ DỊCH VỤ RẺ NHẤT</h4>
                <p>
                  Chúng tôi cam kết đưa ra mức giá ưu đãi nhất trên thị trường
                  để tất cả thú cưng đều có cơ hội được trải nghiệm dịch vụ của
                  chúng tôi.
                </p>
              </Col>
              <Col className="col-camket">
                <h4>🥇 CHẤT LƯỢNG HÀNG ĐẦU</h4>
                <p>
                  Chúng tôi không ngừng nâng cao phát triển trình độ kỹ năng của
                  nhân sự để phục vụ thú cưng đem đến kết quả tốt nhất.
                </p>
              </Col>
            </Row>
          </Row>
          <Row className="mt-3 row-content">
            <Col className="content">
              <h2>⚠️ VÌ SAO NÊN SPA CHO CHÓ MÈO ĐỊNH KỲ VÀ THƯỜNG XUYÊN?</h2>
              <hr className="hr" />
              <p>
                Còn niềm vui và hạnh phúc nào hơn khi những người bạn bốn chân
                được khoác trên mình bộ lông mềm mượt, thơm lâu và sạch sẽ.
              </p>
              <p>
                Mỗi người bạn nhỏ đều có những thói quen và sở thích khác nhau.
                Chính vì vậy, Pet Mart luôn có những sự lựa chọn dịch vụ spa cho
                chó mèo phù hợp nhất với những dòng sản phẩm sữa tắm trị liệu
                đảm bảo an toàn cho sức khỏe của thú cưng.
              </p>
              <p>
                Với tình yêu thương với thú cưng vô bờ bến, chúng tôi chắc chắn
                sẽ mang tới cho thú cưng và khách hàng những trải nghiệm thoải
                mái nhất tại Pet Mew.
              </p>
            </Col>
            <Col className="figure" >
              <img src="/src/assets/image/petshop2.png" alt="#" />
            </Col>
          </Row>
          <Row className="mt-3 row-content">
            <Col className="content">
              <h2>📛 LƯU Ý KHI SỬ DỤNG DỊCH VỤ PET BATHING</h2>
              <hr className="hr" />
              <p>
                Pet Mart không tiếp nhận vật nuôi đang mang thai, đang điều trị
                bệnh, mới phẫu thuật, có tiểu sử bệnh hen, co giật hoặc các bệnh
                lý khác khiến thú nuôi không có khả năng tự chủ.
              </p>
              <p>
                Để đảm bảo an toàn cho sức khỏe khi đưa đến làm dịch vụ spa thú
                cưng:<b>Không để thú cưng quá đói, hoặc ăn quá no và chạy nhảy quá
                sức trước khi đến cửa hàng.</b> Có kế hoạch che nắng mưa trước khi
                đến và sau khi về. Nếu thú cưng có những biểu hiện bất thường về
                sức khỏe xin vui lòng liên hệ Pet Mart để được trợ giúp.
              </p>
              <p>
                <b>Vui lòng kiểm tra kỹ thú cưng khi đến đón thú cưng sau khi làm
                dịch vụ.</b> Quy trình này đảm bảo nhân viên của Pet Mart đã thực
                hiện đúng yêu cầu và bạn hài lòng với chất lượng dịch vụ.
              </p>
            </Col>
            <Col className="figure" >
              <img src="/src/assets/image/petshop3.png" alt="#" />
            </Col>
          </Row>
          <Row>

          </Row>
        </Container>
      </div>
    </div>
  );
};

export default GioiThieu;
