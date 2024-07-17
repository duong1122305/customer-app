import { Container, Row } from "react-bootstrap";
import "./DichVu.css";

const DichVu = () => {
  return (
    <Container className="services">
      <Row className="row-1">
        <h3>Dịch vụ</h3>
      </Row>
      <Row className="row-2">
        <p>
          Tại MewShop, đội ngũ nhân viên của chúng tôi được đào tạo để nâng cao
          năng lực chuyên môn với cơ sở vật chất hiện đại nhằm duy trì tiêu
          chuẩn cao trong công tác chăm sóc sức khỏe của các Boss
        </p>
      </Row>
    </Container>
  );
};

export default DichVu;
