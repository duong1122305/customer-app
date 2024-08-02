import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const Pet = () => {
  const [lstPet, setLstPet] = useState([]);
  const token = sessionStorage.getItem("token");
  const tokenResult = JSON.parse(token);
  const id = tokenResult.id;
  console.log(id);
  useEffect(() => {
    const getPet = async () => {
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
      if (result.isSuccess === true) {
        setLstPet(result.data);
      } else {
        console.log(result.error);
      }
    };
    getPet();
  }, [id]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>STT</th>
          <th>Pet Name</th>
          <th>Ngày sinh</th>
          <th>Giới</th>
        </tr>
      </thead>
      <tbody>
        {lstPet.map((pet, index) => (
          <tr key={pet.id}>
            <td>{index + 1}</td>
            <td>{pet.name}</td>
            <td>{pet.birthday}</td>
            <td>{pet.gender ? "Đực" : "Cái"}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Pet;
