import {
  Button,
  ButtonGroup,
  FloatingLabel,
  Form,
  Modal,
} from "react-bootstrap";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import Announcement from "../../components/AnnouncementComponent/Announcement";

const CreatePet = ({ show, onHide }) => {
  const petSpe = useRef(null);
  const petName = useRef(null);
  const petGender = useRef(null);
  const petWeight = useRef(null);
  const petNeu = useRef(null);
  const petVaccine = useRef(null);
  const petNote = useRef(null);
  const petBirth = useRef(null);
  const petColor = useRef(null);
  const [showAlert, setShowAlert] = useState(false);
  const [content, setContent] = useState("");

  const [lstPetSpecies, setLstPetSpecies] = useState([]);
  useEffect(() => {
    const layDanhSachLoaiThuCung = async () => {
      try {
        const response = await fetch(
          "https://localhost:7039/api/PetSpecies/get-all"
        );
        const result = await response.json();
        if (result.isSuccess) {
          setLstPetSpecies(result.data);
        } else {
          console.log("ko");
        }
      } catch (error) {
        console.error(error);
      }
    };
    layDanhSachLoaiThuCung();
  }, []); // Mảng phụ thuộc trống đảm bảo rằng hàm này chỉ chạy một lần khi mount

  const handleCreatePet = async (event) => {
    event.preventDefault(); // Ngăn chặn hành vi gửi form mặc định

    const thuCungMoi = {
      ownerId: JSON.parse(sessionStorage.getItem("token")).id,
      speciesId: parseInt(petSpe.current.value, 10),
      name: petName.current.value,
      gender: petGender.current.value === "true",
      birthday: petBirth.current.value,
      weight: parseFloat(petWeight.current.value),
      neutered: petNeu.current.value === "true",
      originalColor: petColor.current.value,
      vaccinated: petVaccine.current.value === "true",
      note: petNote.current.value,
    };

    try {
      const response = await fetch(
        "https://localhost:7039/api/PetManager/create-pet",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(thuCungMoi),
        }
      );

      const result = await response.json();

      if (result.isSuccess) {
        setShowAlert(true);
        setContent("Boss của bạn đã được thêm!!!");
        onHide(); // Đóng modal khi thành công
      } else {
        setContent("Oops!!! Có chút trục trặc mất rùi");
        console.log("loi");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Body>
          <Form method="post" onSubmit={handleCreatePet}>
            <FloatingLabel label="Boss thuộc">
              <Form.Select ref={petSpe}>
                {lstPetSpecies.length > 0 ? (
                  lstPetSpecies.map((spe, index) => (
                    <option key={index} value={spe.id}>
                      {spe.name}
                    </option>
                  ))
                ) : (
                  <p>Loading ....</p>
                )}
              </Form.Select>
            </FloatingLabel>
            <FloatingLabel label="Tên boss">
              <Form.Control type="text" ref={petName} />
            </FloatingLabel>
            <FloatingLabel label="Boss là ...">
              <Form.Select ref={petGender}>
                <option value={true}>Đực</option>
                <option value={false}>Cái</option>
              </Form.Select>
            </FloatingLabel>
            <FloatingLabel label="Sinh nhật của boss">
              <Form.Control type="date" ref={petBirth} />
            </FloatingLabel>
            <FloatingLabel label="Cân nặng của boss">
              <Form.Control type="number" ref={petWeight} />
            </FloatingLabel>
            <FloatingLabel label="Boss đã triệt sản">
              <Form.Select ref={petNeu}>
                <option value={true}>Đã triệt sản</option>
                <option value={false}>Chưa triệt sản</option>
              </Form.Select>
            </FloatingLabel>
            <FloatingLabel label="Boss đã tiêm phòng">
              <Form.Select ref={petVaccine}>
                <option value={true}>Đã tiêm phòng</option>
                <option value={false}>Chưa tiêm phòng</option>
              </Form.Select>
            </FloatingLabel>
            <FloatingLabel label="Màu lông của boss">
              <Form.Control type="text" ref={petColor} />
            </FloatingLabel>
            <FloatingLabel label="Ghi chú">
              <Form.Control as="textarea" ref={petNote} />
            </FloatingLabel>
            <ButtonGroup>
              <Button type="submit">Xác nhận boss</Button>
              <Button type="reset">Nhập lại</Button>
              <Button type="button" onClick={onHide}>
                Đóng
              </Button>
            </ButtonGroup>
          </Form>
        </Modal.Body>
      </Modal>
      <Announcement
        show={showAlert}
        content={content}
        onClose={() => setShowAlert(false)}
      />
    </div>
  );
};

CreatePet.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
};

export default CreatePet;
