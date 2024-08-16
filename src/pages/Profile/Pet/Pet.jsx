import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import callApi from "../../../utlis/request";
import moment from "moment";

const Pet = () => {
  const [lstPet, setLstPet] = useState([]);
  const token = sessionStorage.getItem("token");
  const tokenResult = JSON.parse(token);
  const id = tokenResult.id;
  useEffect(() => {
    const getPet = async () => {
      const response = await callApi(
        `PetManager/get-pet-by-guest?id=${id}`,
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
          <th>#</th>
        </tr>
      </thead>
      <tbody>
        {lstPet.map((pet, index) => (
          <tr key={pet.id}>
            <td>{index + 1}</td>
            <td>{pet.name}</td>
            <td>{moment(pet.birthday).format('DD-MM-YYYY')}</td>
            <td>{pet.gender ? "Đực" : "Cái"}</td>
            <td>
              <Button style={{height:"30px"}}>Sửa</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Pet;
