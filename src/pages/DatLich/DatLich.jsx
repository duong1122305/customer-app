import { useEffect, useState } from "react";
import "./DatLich.css";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Image,
  Row,
} from "react-bootstrap";

const DatLich = () => {
  const [lstServices, setLstServices] = useState([]);
  const [lstPetSpecies, setLstPetSpecies] = useState([]);
  const [lstType, setLstType] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const token = sessionStorage.getItem("token");
  const tokenResult = JSON.parse(token);
  useEffect(() => {
    const id = tokenResult === null ? "" : tokenResult.id;
    console.log(id);
    const services = async () => {
      const response = await fetch(
        "https://localhost:7039/api/Services/getAllService",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      if (result.isSuccess) {
        console.log(result.data);
        const data = result.data;
        setLstServices(data);
      } else {
        console.log("khong ok");
      }
    };
    const petSpecies = async () => {
      if (id === "") {
        const response = await fetch(
          "https://localhost:7039/api/PetSpecies/get-all",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();
        if (result.isSuccess) {
          const data = result.data;
          setLstPetSpecies(data);
        } else {
          console.log("pet khong");
        }
      } else {
        const response = await fetch(
          `https://localhost:7039/api/PetManager/get-pet-by-guest?id=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();
        if (result.isSuccess) {
          const data = result.data;
          console.log(data);
          setLstPetSpecies(data);
        } else {
          console.log("pet khong");
        }
      }
    };
    const petType = async () => {
      const response = await fetch(
        "https://localhost:7039/api/PetManager/get-types",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      if (result.isSuccess) {
        const data = result.data;
        setLstType(data);
      } else {
        console.log("khong type");
      }
    };
    services();
    petSpecies();
    petType();
  }, []);

  const filteredPetSpecies = lstPetSpecies.filter(
    (pet) => !selectedType || pet.petTypeId === selectedType
  );

  return (
    <>
      <div className="bookHead">
        <Image className="image" src="/src/assets/image/ok.png" />
      </div>
      <Container className="booking">
        <Col className="col-full">
          <Form method="post">
            <FloatingLabel className="label" label="Dịch vụ đặt">
              <Form.Select>
                {lstServices.length > 0 ? ( // Kiểm tra xem lstServices có dữ liệu hay không
                  lstServices.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Không có dịch vụ nào</option> // Hiển thị thông báo khi không có dữ liệu
                )}
              </Form.Select>
            </FloatingLabel>
            <FloatingLabel className="label" label="Email">
              <Form.Control type="email" placeholder="youremail@gmail.com" />
            </FloatingLabel>
            <FloatingLabel className="label" label="Họ và tên">
              <Form.Control type="text" placeholder="Nguyễn Văn B" />
            </FloatingLabel>
            <FloatingLabel className="label" label="SĐT">
              <Form.Control type="text" placeholder="0982873xxx" />
            </FloatingLabel>
            <FloatingLabel className="label" label="Địa chỉ">
              <Form.Control
                as="textarea"
                placeholder="Tổ X, phường Y, quận/huyện Z"
              />
            </FloatingLabel>
            <FloatingLabel className="label" label="Loài">
              <Form.Select
                onChange={(e) => setSelectedType(parseInt(e.target.value, 10))}
              >
                {lstType.length > 0 ? (
                  lstType.map((typePet) => (
                    <option key={typePet.id} value={typePet.id}>
                      {typePet.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Không có loài nào</option>
                )}
              </Form.Select>
            </FloatingLabel>
            <FloatingLabel className="label" label="Thuộc giống">
              <Form.Select>
                {filteredPetSpecies.length > 0 ? (
                  tokenResult === null ? (
                    filteredPetSpecies.map((pet) => (
                      <option key={pet.id} value={pet.id}>
                        {pet.name}
                      </option>
                    ))
                  ) : (
                    filteredPetSpecies.map((pet) => (
                      <option key={pet.id} value={pet.id}>
                        {pet.species}
                      </option>
                    ))
                  )
                ) : (
                  <option disabled>Không có giống nào</option>
                )}
              </Form.Select>
            </FloatingLabel>
            <FloatingLabel className="label" label="Tên boss">
              <Form.Control type="text" />
            </FloatingLabel>
            <FloatingLabel className="label" label="Cân nặng">
              <Form.Control type="number" />
            </FloatingLabel>
            <FloatingLabel className="label" label="Ngày">
              <Form.Control type="date" />
            </FloatingLabel>
            <FloatingLabel className="label" label="Thời gian">
              <Form.Control type="time" />
            </FloatingLabel>
            <div className="divBtn">
              <Button variant="dark">GỬI YÊU CẦU</Button>
              <Button
                variant="danger"
                type="reset"
                style={{ marginLeft: "10px" }}
              >
                NHẬP LẠI
              </Button>
            </div>
          </Form>
        </Col>
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
