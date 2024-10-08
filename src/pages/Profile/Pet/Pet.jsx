import { useEffect, useState } from "react";
import { Button, Container, Pagination, Table } from "react-bootstrap";
import callApi from "../../../utlis/request";
import moment from "moment";
import UpdatePet from "./UpdatePet";
import "./Pet.css";
import CreatePet from "../../Pet/CreatePet";

const Pet = () => {
  const [lstPet, setLstPet] = useState([]);
  const [idPet, setIdPet] = useState(null);
  const [show, setShow] = useState(false);
  const [dataChange, setDataChange] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [petsPerPage] = useState(15);
  const [showCreate, setShowCreate] = useState(false);
  const [ifTrue, setIfTrue] = useState(false);

  const token = sessionStorage.getItem("token");
  const tokenResult = JSON.parse(token);
  const id = tokenResult.id;

  const handleGetIdPet = (idPet) => {
    setIdPet(idPet);
    setShow(true);
  }

  const handleDataChange = (data) => {
    setDataChange(data);
  }

  const getDataFromChild = (dataChild) => {
    setIfTrue(dataChild);
  };

  useEffect(() => {
    const getPet = async () => {
      const response = await callApi(`PetManager/get-pet-by-guest?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.isSuccess === true) {
        setLstPet(result.data);
      } else {
        console.log(result.error);
      }
    };
    getPet();
    if(dataChange){
      getPet();
    }
    if(ifTrue){
      getPet();
    }
  }, [id, dataChange, ifTrue]);

  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = lstPet.slice(indexOfFirstPet, indexOfLastPet);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleShowCreate = () => {
    setShowCreate(true);
  }

  return (
    <Container className="con_pet">
    <p className="text-danger mt-2">* Tải lại trang nếu không thấy sự thay đổi sau khi cập nhật</p>
    <Button onClick={handleShowCreate} className="mb-2">Thêm pet</Button>
      <Table striped bordered hover className="w-100">
        <thead>
          <tr>
            <th>STT</th>
            <th>Pet Name</th>
            <th>Ngày sinh</th>
            <th>Giới</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {currentPets.map((pet, index) => (
            <tr key={pet.id}>
              <td>{index + 1}</td>
              <td>{pet.name}</td>
              <td>{moment(pet.birthday).format("DD-MM-YYYY")}</td>
              <td>{pet.gender ? "Đực" : "Cái"}</td>
              <td>
                <Button style={{ height: "30px" }} onClick={() => handleGetIdPet(pet.id)}>Sửa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.First onClick={() => paginate(1)} />
        <Pagination.Prev
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {/* You'll likely want to add more page number items here dynamically */}
        <Pagination.Item active={currentPage === 1} onClick={() => paginate(1)}>
          1
        </Pagination.Item>
        <Pagination.Item active={currentPage === 2} onClick={() => paginate(2)}>
          2
        </Pagination.Item>
        <Pagination.Next
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastPet >= lstPet.length}
        />
        <Pagination.Last
          onClick={() => paginate(Math.ceil(lstPet.length / petsPerPage))}
        />
      </Pagination>
      <UpdatePet 
        show={show && idPet !== null}
        onHide={() => setShow(false)}
        id={idPet}
        onDataChange={handleDataChange}
      />
      <CreatePet 
        show={showCreate}
        onHide={() => setShowCreate(false)}
        sendData={getDataFromChild}
      />
    </Container>
  );
};

export default Pet;
