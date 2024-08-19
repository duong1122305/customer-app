import { useEffect, useState } from "react";
import { Button, Pagination, Table } from "react-bootstrap";
import callApi from "../../../utlis/request";
import moment from "moment";

const Pet = () => {
  const [lstPet, setLstPet] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [petsPerPage] = useState(15);

  const token = sessionStorage.getItem("token");
  const tokenResult = JSON.parse(token);
  const id = tokenResult.id;
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
  }, [id]);

  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = lstPet.slice(indexOfFirstPet, indexOfLastPet);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Table striped bordered hover>
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
                <Button style={{ height: "30px" }}>Sửa</Button>
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
    </>
  );
};

export default Pet;
