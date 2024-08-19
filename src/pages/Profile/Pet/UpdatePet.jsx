import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  FloatingLabel,
  Form,
  Modal,
} from "react-bootstrap";
import PropTypes from "prop-types";
import AcceptRequest from "../../../components/AcceptRequestComponent/AcceptRequest";
import callApi from "../../../utlis/request";
import Announcement from "../../../components/AnnouncementComponent/Announcement";

const UpdatePet = ({ onHide, show, id, onDataChange }) => {
  const [lstPetSpecies, setLstPetSpecies] = useState([]);
  const [showAccept, setShowAccept] = useState(false);
  const [showAnnounce, setShowAnnounce] = useState(false);
  const [content, setContent] = useState("");
  const [pet, setPet] = useState({
    id: "",
    speciesId: "",
    name: "",
    gender: true,
    birthday: "",
    weight: "",
    neutered: true,
    note: "",
  });

  const handleShowRequest = () => {
    setShowAccept(true);
  };

  useEffect(() => {
    try {
      const getSpe = async () => {
        const response = await callApi("PetSpecies/get-all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        if (result.isSuccess) {
          setLstPetSpecies(result.data);
        } else {
          console.log(result.error);
        }
      };

      const getPet = async () => {
        if (id) {
          const response = await callApi(`PetManager/GetById?id=${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const result = await response.json();
          if (result.isSuccess) {
            const apiBirthday = result.data.birthday; // Giả sử apiBirthday ở định dạng '2023-08-15T00:00:00'

            // Chuyển đổi sang YYYY-MM-DD
            const date = new Date(apiBirthday);
            const formattedBirthday = date.toISOString().slice(0, 10);
            setPet({ ...result.data, birthday: formattedBirthday });
          } else {
            console.log(result.error);
          }
        }
      };

      getSpe();
      getPet();
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  const handleUpdatePet = async () => {
    const respone = await callApi("PetManager/update-pet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pet),
    });
    const result = await respone.json();
    if (result.isSuccess) {
      setShowAnnounce(true);
      setContent("Sửa thành công");
      onDataChange(true);
    } else {
      setShowAnnounce(true);
      setContent(result.error);
    }
  };

  return (
    <div>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Body>
          <Form method="post">
            <FloatingLabel label="Boss thuộc">
              <Form.Select
                value={pet.speciesId}
                onChange={(e) => setPet({ ...pet, speciesId: e.target.value })}
              >
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
              <Form.Control
                type="text"
                value={pet.name}
                onChange={(e) => setPet({ ...pet, name: e.target.value })}
              />
            </FloatingLabel>
            <FloatingLabel label="Boss là ...">
              <Form.Select
                value={pet.gender}
                onChange={(e) => setPet({ ...pet, gender: e.target.value })}
              >
                <option value={true}>Đực</option>
                <option value={false}>Cái</option>
              </Form.Select>
            </FloatingLabel>
            <FloatingLabel label="Sinh nhật của boss">
              <Form.Control
                type="date"
                value={pet.birthday}
                onChange={(e) => setPet({ ...pet, birthday: e.target.value })}
              />
            </FloatingLabel>
            <FloatingLabel label="Cân nặng của boss">
              <Form.Control
                type="number"
                value={pet.weight}
                onChange={(e) => setPet({ ...pet, weight: e.target.value })}
              />
            </FloatingLabel>
            <FloatingLabel label="Boss đã triệt sản">
              <Form.Select
                value={pet.neutered}
                onChange={(e) => setPet({ ...pet, neutered: e.target.value })}
              >
                <option value={true}>Đã triệt sản</option>
                <option value={false}>Chưa triệt sản</option>
              </Form.Select>
            </FloatingLabel>
            <FloatingLabel label="Ghi chú">
              <Form.Control
                as="textarea"
                value={pet.note}
                onChange={(e) => setPet({ ...pet, note: e.target.value })}
              />
            </FloatingLabel>
            <ButtonGroup>
              <Button onClick={handleShowRequest}>Xác nhận boss</Button>
              <Button type="reset">Nhập lại</Button>
              <Button type="button" onClick={onHide}>
                Đóng
              </Button>
            </ButtonGroup>
          </Form>
        </Modal.Body>
      </Modal>
      <AcceptRequest
        show={showAccept}
        onClose={() => setShowAccept(false)}
        content="Xác nhận sửa thông tin boss ?"
        onAccept={handleUpdatePet}
      />
      <Announcement
        show={showAnnounce}
        content={content}
        onClose={() => setShowAnnounce(false)}
      />
    </div>
  );
};

UpdatePet.propTypes = {
  onHide: PropTypes.func,
  show: PropTypes.bool,
  id: PropTypes.number,
  onDataChange: PropTypes.func,
};

export default UpdatePet;
